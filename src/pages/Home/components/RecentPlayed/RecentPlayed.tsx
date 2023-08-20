import { useState, useContext, useEffect } from "react";
import { Track } from "interfaces/Track";
import { SnackbarContext } from "providers/SnackbarProvider";
import trackService from "services/Spotify/Track";
import Container from "components/Container/Container";
import PlayButton from "components/PlayButton/PlayButton";

export default function RecentPlayed() {
  const [loading, setLoading] = useState<boolean>(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await trackService.getRecentlyPlayed();
        console.log(response);
        setTopTracks(response.map((r) => r.track));
      } catch (e) {
        openSnackbar(`Error fetching top tracks: ${e}`, "error");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  function convertToMinutes(duration: number) {
    let minutes = duration / 60000;
    let seconds = (duration % 60000) / 1000;

    return `${Math.trunc(minutes)}:${Math.trunc(seconds)}`;
  }

  return (
    <Container title="Recently Played" items={topTracks}>
      <ul className="w-full">
        {topTracks.map((track, index) => (
          <li className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row items-center whitespace-nowrap">
              <span className="font-bold text-lg text-slate-400 w-4">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <img
                className="w-16 h-16 rounded-xl mx-4"
                src={track.album?.images[1].url}
              />

              <div className="flex flex-col max-w-[90px] md:max-w-none">
                <span className="font-bold overflow-hidden text-ellipsis">{track.name}</span>
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
        ))}
      </ul>
    </Container>
  );
}
