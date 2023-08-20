import { useState, useEffect, useContext } from "react";
import { SnackbarContext } from "providers/SnackbarProvider";
import { Track } from "interfaces/Track";
import trackService from "services/Spotify/Track";
import TrackCard from "components/TrackCard/TrackCard";
import Container from "components/Container/Container";

export default function Recommendations() {
  const [loading, setLoading] = useState<boolean>(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await trackService.getRecommendations();
        setTopTracks(response);
      } catch (e) {
        openSnackbar(`Error fetching top tracks: ${e}`, "error");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container title="Songs You Might Like" items={topTracks}>
      {topTracks.map((track) => (
        <TrackCard
          key={track.id}
          id={track.id}
          name={track.name}
          artists={track.artists}
          image={track?.album?.images[1].url}
        />
      ))}
    </Container>
  );
}
