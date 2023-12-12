import { useState, useContext, useEffect } from "react";
import { Track } from "interfaces/Track";
import { SnackbarContext } from "providers/SnackbarProvider";
import trackService from "services/Spotify/Track";
import ListItem from "components/ListItem/ListItem";
import { TrackHistory } from "interfaces/RecentlyPlayed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type TracksGroupedByDate = {
  date: string;
  tracks: Track[];
};

export default function Recent() {
  const [loading, setLoading] = useState<boolean>(false);

  const [recentTracks, setRecentTracks] = useState<TrackHistory[]>([]);
  const [groupedTracks, setGoupedTracks] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>();

  const { openSnackbar } = useContext(SnackbarContext);

  const limit = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await trackService.getRecentlyPlayed(limit, nextPage);

      const before = response.items.length < limit 
        ? null 
        : response.cursors.before;

      const allTracks = [...recentTracks, ...response.items];

      setNextPage(before);
      setRecentTracks(allTracks);
      groupTracksByDate(allTracks);
    } catch (e) {
      openSnackbar(`Error fetching top tracks: ${e}`, "error");
    }

    setLoading(false);
  };

  const groupTracksByDate = (tracks: TrackHistory[]) => {
    const groupedByDate = tracks.reduce((acc: any, item: TrackHistory) => {
      const date = item.played_at.toString().split("T")[0];
      acc[date] = [...(acc[date] || []), item];
      return acc;
    }, []);

    setGoupedTracks(groupedByDate);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
  }

  return (
    <main className="lg:mx-0 md:ml-0 mx-8">
      <h1 className="font-bold text-xl">Recently listened songs</h1>
      {Object.keys(groupedTracks).map((date: any, index) => (
        <div className="mt-8" key={index}>
          <h2 className="font-semibold text-lg">{formatDate(date)}</h2>
          {groupedTracks[date].map((item: TrackHistory, trackIndex: number) => (
            <ListItem index={trackIndex} track={item.track} showIndex={false} />
          ))}
        </div>
      ))}

      {nextPage && (
        <button className="w-full mt-8 mb-4 font-bold" onClick={fetchData}>
          show more{" "}
          <FontAwesomeIcon icon={faCaretDown} className="text-lg ml-2" />
        </button>
      )}
    </main>
  );
}
