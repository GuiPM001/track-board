import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import spotifyLogo from "assets/spotify-logo-black.png";
import { Artist } from "interfaces/Artist";

interface CarouselProps {
  items: Artist[];
}

export default function Carousel(props: CarouselProps) {
  const { items } = props;

  const displacement = 575;

  const slideLeft = () => {
    const slider = document.getElementById("slider")!;

    slider.scrollLeft = slider.scrollLeft - displacement;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider")!;

    slider.scrollLeft = slider.scrollLeft + displacement;
  };

  return (
    <section>
      <div className="relative flex items-center mt-2">
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="hidden md:block opacity-50 cursor-pointer hover:opacity-100 text-2xl mr-2"
          onClick={slideLeft}
        />

        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {items.map((item, index) => (
            <div key={index} className="inline-block m-2">
              <a target="_blank" href={item.external_urls.spotify}>
                <img
                  className="w-[70px] self-start mb-1"
                  alt="Spotify Logo"
                  src={spotifyLogo}
                />
              </a>

              <img
                src={item.images[0].url}
                alt="Artist image"
                className="w-28 h-28 md:w-32 md:h-32 bg-cover bg-center rounded-lg first:ml-0 last:mr-0 shadow-[inset_0_-28px_28px_rgba(0,0,0,0.6)]"
              />
              <span className="font-bold flex items-end whitespace-normal w-32">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <FontAwesomeIcon
          icon={faAngleRight}
          className="hidden md:block opacity-50 cursor-pointer hover:opacity-100 text-2xl ml-2"
          onClick={slideRight}
        />
      </div>
    </section>
  );
}
