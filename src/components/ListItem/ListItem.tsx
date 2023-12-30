import PlayButton from "components/PlayButton/PlayButton";
import { useConverToMinutes } from "hooks/useConvertToMinutes";
import { Track } from "interfaces/Track";
import spotifyIconBlack from "assets/spotify-icon-black.png";

interface ListItemProps {
  index: number;
  track: Track;
  showIndex?: boolean;
}

export default function ListItem(props: ListItemProps) {
  const { index, track, showIndex = true } = props;

  const [convertToMinutes] = useConverToMinutes();

  return (
    <li className="w-full flex flex-row items-center justify-between mb-6">
      <div className="flex flex-row items-center whitespace-nowrap">
        {showIndex &&
          <span className="font-bold text-lg text-slate-400 w-4 mr-4">
            {(index + 1).toString().padStart(2, "0")}
          </span>
        }
        <img
          alt="Album's image"
          src={track.album?.images[1].url}
          className="w-20 h-20 rounded-md mr-4 border border-slate-200"
        />

        <div className="flex flex-col justify-around h-20 max-w-[200px] md:max-w-xs lg:max-w-md">
          <div className="flex flex-col mb-2">
            <span className="font-bold overflow-hidden text-ellipsis">
              {track.name}
            </span>
            <span className="text-sm font-semibold text-slate-400 overflow-hidden text-ellipsis">
              {track.artists?.map((a) => a.name).join(", ")}
            </span>
          </div>

          <a className="flex flex-row items-center" target="_blank" href={track.external_urls.spotify}>
            <img className="w-[21px] h-[21px]" alt="Spotify Icon" src={spotifyIconBlack}/>
            <span className="text-sm font-semibold ml-1">PLAY ON SPOTIFY</span>
          </a>
        </div>
      </div>

      <div className="flex flex-row items-center mr-4">
        <span className="font-bold text-slate-400 mr-6">
          {convertToMinutes(track.duration_ms)}
        </span>
        <PlayButton trackId={track.id} />
      </div>
    </li>
  );
}
