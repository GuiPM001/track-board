import PlayButton from "components/PlayButton/PlayButton";
import { useConverToMinutes } from "hooks/useConvertToMinutes";
import { Track } from "interfaces/Track";

interface ListItemProps {
  index: number;
  track: Track;
  showIndex?: boolean;
}

export default function ListItem(props: ListItemProps) {
  const { index, track, showIndex = true } = props;

  const [convertToMinutes] = useConverToMinutes();

  return (
    <li className="w-full flex flex-row items-center justify-between my-2">
      <div className="flex flex-row items-center whitespace-nowrap">
        {showIndex &&
          <span className="font-bold text-lg text-slate-400 w-4">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        }
        <img
          className="w-16 h-16 rounded-xl mx-4 border border-slate-200"
          src={track.album?.images[1].url}
        />

        <div className="flex flex-col max-w-[200px] md:max-w-xs lg:max-w-md">
          <span className="font-bold overflow-hidden text-ellipsis">
            {track.name}
          </span>
          <span className="text-sm font-semibold text-slate-400 overflow-hidden text-ellipsis">
            {track.artists?.map((a) => a.name).join(", ")}
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center -mr-4">
        <span className="font-bold text-slate-400">
          {convertToMinutes(track.duration_ms)}
        </span>
        <PlayButton trackId={track.id} />
      </div>
    </li>
  );
}
