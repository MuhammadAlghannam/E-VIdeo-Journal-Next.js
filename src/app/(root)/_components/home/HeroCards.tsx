import Image from "next/image";

interface Card {
  imagePath: string;
  title: string;
}

interface HeroCardsProps {
  card: Card;
}

export const HeroCards = ({ card }: HeroCardsProps) => {
  return (
    <div className="rounded-3xl group transition-transform duration-500 hover:-translate-y-10">
      <figure className="relative overflow-hidden rounded-3xl before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100">
        <Image
          src={card.imagePath}
          alt={card.title}
          width={400}
          height={500}
          quality={75}
          className="w-[400px] h-[500px] object-cover shrink"
        />

        <figcaption className="absolute bottom-0 left-0 text-white bg-black/50 p-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          <p className="text-h5-semibold">{card.title}</p>
        </figcaption>
      </figure>
    </div>
  );
};
