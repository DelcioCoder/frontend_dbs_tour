import { Evaluation, User } from "@/types/api";
import { StarRating } from "@/components/StarRating";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";


interface ReviewsListProps {
    evaluations: Evaluation[];
    users: User[];
}




export default function ReviewsList({ evaluations, users }: ReviewsListProps) {
  return (
    <div className="space-y-6">
      {evaluations.map((evaluation, index) => {
        // Encontrar o usuário correspondente à avaliação
        const user = users.find((u) => u.id === evaluation.user);
        const timeAgo = formatDistanceToNow(parseISO(evaluation.date_added), {
          locale: ptBR,
        });

        return (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <div className="font-semibold">{user ? user.username : "Usuário desconhecido"}</div>
                  <StarRating rating={evaluation.stars} />
                </div>
              </div>
              <span className="text-sm text-gray-500">{timeAgo}</span>
            </div>
            <p className="text-gray-700">{evaluation.comment || "Sem comentário."}</p>
          </div>
        );
      })}
    </div>
  );
}
