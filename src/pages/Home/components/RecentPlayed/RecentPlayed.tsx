import { useState, useContext, useEffect } from "react";
import { Track } from "interfaces/Track";
import { SnackbarContext } from "providers/SnackbarProvider";
import trackService from "services/Spotify/Track";
import Container from "components/Container/Container";
import ListItem from "components/ListItem/ListItem";

export default function RecentPlayed() {
  const [loading, setLoading] = useState<boolean>(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await trackService.getRecentlyPlayed(5);

        setTopTracks(response.items.map(r => r.track));
      } catch (e) {
        openSnackbar(`Error fetching top tracks: ${e}`, "error");
      }

      setLoading(false);
    };

    fetchData();
  }, []);
  
  return (
    <Container title="Recently played" items={topTracks} showAll={true}>
      <ul className="w-full">
        {topTracks.map((track, index) => (
          <ListItem index={index} track={track}/>
        ))}
      </ul>
    </Container>
  );
}
