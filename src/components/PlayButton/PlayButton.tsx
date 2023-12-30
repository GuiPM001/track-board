import { useContext } from "react";
import { PlayerContext } from "providers/PlayerProvider";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayButtonProps {
  trackId: string;
  showLabel?: boolean;
}

export default function PlayButton(props: PlayButtonProps) {
  const { changeTrack } = useContext(PlayerContext);

  return (
    <div className="flex flex-row justify-center items-center">
      
      <button
        onClick={() => changeTrack(props.trackId)}
        className="flex justify-center items-center text-emerald-500 hover:text-emerald-700 transition duration-150 ease-linear"
      >
        {props.showLabel && 
        <span className=" text-lg font-bold mr-4">
          Preview
        </span>
      }
        <FontAwesomeIcon icon={faPlay} className=" text-lg" />
      </button>
    </div>
  );
}
