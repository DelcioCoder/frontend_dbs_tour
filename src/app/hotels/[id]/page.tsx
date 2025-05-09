import { notFound } from "next/navigation";
import fetchData from "@/utils/fetchData";
import { HotelType, ImageType } from "@/types";
import { HotelSchema, ImageSchema, UserSchema } from "../../../../schemas";
import { PaginatedResponse, Evaluation, User } from "@/types/api";
import { calculateAverageRating } from "@/utils/ratings";
import HotelHeader from "@/components/hotelComponents/HotelHeader";
import HotelInfo from "@/components/hotelComponents/HotelInfo";
import ReviewForm from "@/components/shared/ReviewForm";
import ReviewsList from "@/components/shared/ReviewsList";
import { getCloudinaryName } from "@/utils/env";


interface Params {
  id: string;
};

interface PageProps {
  params: Promise<any> & Params;
}

export default async function Page({ params }: PageProps) {
  const cloudinaryName = getCloudinaryName();
  const resolvedParams = await params;

  const [hotelData, imagesData, evaluationsData, usersData] = await Promise.all([
    fetchData<HotelType>(`hotels/${resolvedParams.id}`),
    fetchData<PaginatedResponse<ImageType>>(`images/`),
    fetchData<PaginatedResponse<Evaluation>>(`evaluations/`),
    fetchData<PaginatedResponse<User>>(`users/`),
  ]);

  if (!hotelData || !imagesData || !evaluationsData || !usersData) {
    notFound();
  }

  const validateHotel = HotelSchema.parse(hotelData);
  const data = {
    object: resolvedParams.id,
    content: 10,
    kind: "hotels",
  };

  const validateImages = ImageSchema.array().parse(imagesData.results);
  const validateUsers = UserSchema.array().parse(usersData.results);

  const hotelImages = validateImages.filter(
    (image: ImageType) =>
      image.object_id === validateHotel.id && image.content_type === 10
  );

  const hotelEvaluations = evaluationsData.results.filter(
    (evaluation: Evaluation) =>
      evaluation.object_id === validateHotel.id && evaluation.content_type === 10
  );

  const evaluationUsers = validateUsers.filter((user: User) =>
    hotelEvaluations.some((evaluation: Evaluation) => evaluation.user === user.id)
  );

  const averageRating = calculateAverageRating(hotelEvaluations);

  const hotelWithDetails = {
    ...validateHotel,
    users: evaluationUsers,
    images: hotelImages,
    averageRating,
    evaluations: hotelEvaluations,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <HotelHeader hotel={hotelWithDetails} kind="hot" cloudinaryName={cloudinaryName} />
      <HotelInfo hotel={hotelWithDetails} cloudinaryName={cloudinaryName} />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Avaliações e Comentários</h2>
        <ReviewForm obj={data} />
      </div>
      <ReviewsList evaluations={hotelWithDetails.evaluations} users={hotelWithDetails.users} />
    </div>
  );
}
