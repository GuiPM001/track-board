import { useContext } from "react";
import { PlayerContext } from "providers/PlayerProvider";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PlayButtonProps {
  trackId: string;
}

export default function PlayButton(props: PlayButtonProps) {
  const { changeTrack } = useContext(PlayerContext);

  return (
    <button onClick={() => changeTrack(props.trackId)} className='h-12 w-12 m-4 border border-slate-200 rounded-2xl bg-white flex justify-center items-center hover:scale-110 transition duration-150 ease-linear'>
      <FontAwesomeIcon icon={faPlay} className='text-emerald-500 text-lg'/>
    </button>
  )
}