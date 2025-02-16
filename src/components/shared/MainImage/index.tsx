import Image from "next/image";

interface MainImageProps {
    image: string;
    alt: string;
    cloudinaryName: string;
}



export default function MainImage ({image, alt, cloudinaryName}: MainImageProps) {
    return (
        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
                src={`https://res.cloudinary.com/${cloudinaryName}/${image}`}
                alt={alt}
                fill
                className="object-cover"
            />
        </div>
    )
}