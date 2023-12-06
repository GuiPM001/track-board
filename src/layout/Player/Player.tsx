import { useContext } from "react";
import { PlayerContext } from "providers/PlayerProvider";

export default function Player() {
  const { trackId } = useContext(PlayerContext);

  const srcEmbed = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  return (
    <section className="h-full lg:h-auto w-full justify-center items-center lg:mt-3 bg-[#282828] rounded-t-xl lg:bg-transparent">
      {trackId ? (
        <div className="h-full w-full rounded-t-xl lg:rounded-xl flex flex-col items-center lg:pt-12">
          <iframe
            className="w-full lg:h-[352px] h-20 rounded-none"
            src={srcEmbed}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <div className="h-full lg:h-[352px] w-full bg-emerald-500 rounded-t-xl lg:rounded-xl flex flex-col items-start lg:items-center justify-center pl-4 lg:p-0 lg:mt-16">
          <h1 className="lg:w-32 text-xl text-center font-semibold lg:font-bold text-white absolute lg:mt-4">
            Select some track
          </h1>
        </div>
      )}
    </section>
  );
}
