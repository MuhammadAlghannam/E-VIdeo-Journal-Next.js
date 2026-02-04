import { HeroCards } from "@/app/(root)/_components/home/HeroCards";
import { homeCardsLinks } from "@/lib/constants/homeCards";


export const Hero = () => {
  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="hero">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          Remain updated in hypospadias free of charge
        </h1>

        <p className="text-h5-regular text-center md:w-4/5 w-full mx-auto">
          The Hypospadias E-Video Journal gives you access to the most updated knowledge in Hypospadias free of charge in a video form that is easy to listen to and to understand
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 place-items-center md:py-20 py-14">
        {homeCardsLinks.map((card, index) => (
          <div key={index} className={`home-card home-card-${index}`}>
            <HeroCards card={card} />
          </div>
        ))}
      </div>
    </section>
  );
};

