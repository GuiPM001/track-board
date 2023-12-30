import { Artist } from "interfaces/Artist";
import PlayButton from "components/PlayButton/PlayButton";
import spotifyLogo from "assets/spotify-logo-black.png";

interface TrackCardProps {
  id: string;
  name: string;
  artists: Artist[];
  image: string;
  link: string;
}

export default function TrackCard(props: TrackCardProps) {
  return (
    <div className="flex flex-col items-center justify-between border border-slate-200 rounded-lg p-2 mb-6 mx-1 w-36 h-[275px]">
      <a target="_blank" href={props.link} className="w-[70px] self-start mb-2">
        <img
          alt="Spotify Logo"
          src={spotifyLogo}
        />
      </a>
      
      <img
        alt="Album's image"
        src={props.image}
        className="w-32 h-32 bg-cover bg-center rounded-md flex items-end justify-end"
      />
      <div className="flex flex-col whitespace-nowrap text-ellipsis w-32 h-56">
        <h2 className="font-bold truncate w-full mt-2">{props.name}</h2>
        <span className="text-sm text-slate-400 font-semibold truncate w-full">
          {props.artists.map((artist) => artist.name).join(", ")}
        </span>
      </div>
      <div className="border border-slate-200 rounded-md w-32 h-28 flex justify-center">
        <PlayButton trackId={props.id} showLabel={true} />
      </div>
    </div>
  );
}
