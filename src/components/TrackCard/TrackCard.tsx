import { Artist } from "interfaces/Artist";
import PlayButton from "components/PlayButton/PlayButton";

interface TrackCardProps {
  id: string;
  name: string;
  artists: Artist[];
  image: string;
}

export default function TrackCard(props: TrackCardProps) {
  return (
    <div className="px-2 pt-2 md:px-4 md:pt-4 mb-4 border border-slate-200 rounded-lg w-36 h-48 md:w-44 md:h-56 flex flex-col items-center justify-center">
      <div
        data-testid="trackImage"
        style={{ backgroundImage: `url(${props.image})` }}
        className="w-28 h-28 md:w-36 md:h-36 bg-cover bg-center rounded-2xl flex items-end justify-end"
      >
        <PlayButton trackId={props.id} />
      </div>
      <h2 className="font-bold truncate w-full mt-2">{props.name}</h2>
      <span className="text-sm text-slate-400 font-semibold truncate w-full">
        {props.artists.map((artist) => artist.name).join(", ")}
      </span>
    </div>
  );
}
