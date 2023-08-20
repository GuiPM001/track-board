import { ReactNode, createContext, useState } from "react";

type PlayerContextType = {
  changeTrack: (id: string) => void;
  trackId: string;
}

export const PlayerContext = createContext<PlayerContextType>({
  changeTrack: () => {},
  trackId: ''
});

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider (props: PlayerProviderProps) {
  const [trackId, setTrackId] = useState<string>('');
  
  function changeTrack(id: string) {
    setTrackId(id);
  }

  return (
    <PlayerContext.Provider value={{ changeTrack, trackId }}>
      {props.children}
    </PlayerContext.Provider>
  )
}