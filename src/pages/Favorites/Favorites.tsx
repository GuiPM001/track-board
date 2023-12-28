import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Carousel from "components/Carousel/Carousel";
import Container from "components/Container/Container";
import ListItem from "components/ListItem/ListItem";
import TrackCard from "components/TrackCard/TrackCard";
import { Artist } from "interfaces/Artist";
import { Playlist } from "interfaces/Playlist";
import { SavedTrack } from "interfaces/SavedTrack";
import { Track } from "interfaces/Track";
import { SnackbarContext } from "providers/SnackbarProvider";
import { useEffect, useState, useContext } from "react";
import artistService from "services/Spotify/Artist";
import playlistService from "services/Spotify/Playlist";
import trackService from "services/Spotify/Track";

export default function Favorites() {
  const [loading, setLoading] = useState<boolean>(false);

  const [savedTracks, setSavedTracks] = useState<SavedTrack[]>([]);
  const [followArtists, setFollowArtists] = useState<Artist[]>([]);

  const { openSnackbar } = useContext(SnackbarContext);

  const qtdItems = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const savedTracks = await trackService.getSavedTracks(qtdItems, 0);
      const artists = await artistService.getFollowArtists();

      setSavedTracks(savedTracks);
      setFollowArtists(artists);
    } catch (e) {
      openSnackbar(`Error fetching top tracks: ${e}`, "error");
    }

    setLoading(false);
  };

  const fetchNextPage = async () => {
    const page = savedTracks.length / qtdItems;

    const tracks = await trackService.getSavedTracks(qtdItems, page);
    setSavedTracks([...savedTracks, ...tracks]);
  }

  return (
    <main className="lg:mx-0 md:ml-0 mx-8">
      <Carousel title="Followed artists" items={followArtists} />

      <h1 className="font-bold text-xl mt-12">Saved tracks</h1>
      {savedTracks.map((item: SavedTrack, index: number) => (
        <ListItem
          key={index}
          index={index}
          track={item.track}
          showIndex={false}
        />
      ))}

      <button className="w-full mt-8 mb-4 font-bold" onClick={fetchNextPage}>
        show more{" "}
        <FontAwesomeIcon icon={faCaretDown} className="text-lg ml-2" />
      </button>
    </main>
  );
}
