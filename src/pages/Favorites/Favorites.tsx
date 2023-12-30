import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Artist } from "interfaces/Artist";
import { SavedTrack } from "interfaces/SavedTrack";
import { SnackbarContext } from "providers/SnackbarProvider";
import { useEffect, useState, useContext } from "react";
import Carousel from "components/Carousel/Carousel";
import ListItem from "components/ListItem/ListItem";
import Loading from "components/Loading/Loading";
import artistService from "services/Spotify/Artist";
import trackService from "services/Spotify/Track";

export default function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [savedTracks, setSavedTracks] = useState<SavedTrack[]>([]);
  const [followArtists, setFollowArtists] = useState<Artist[]>([]);

  const { openSnackbar } = useContext(SnackbarContext);

  const qtdItems = 20;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const savedTracks = await trackService.getSavedTracks(qtdItems, 0);
      const artists = await artistService.getFollowArtists();

      setSavedTracks(savedTracks);
      setFollowArtists(artists);
    } catch (e) {
      openSnackbar(`Error fetching top tracks: ${e}`, "error");
    }

    setIsLoading(false);
  };

  const fetchNextPage = async () => {
    const page = savedTracks.length / qtdItems;

    const tracks = await trackService.getSavedTracks(qtdItems, page);
    setSavedTracks([...savedTracks, ...tracks]);
  };

  return (
    <main className="lg:mx-0 md:ml-0 mx-8">
      <div>
        <h1 className="font-bold text-xl">Followed artists</h1>
        {isLoading && <Loading />}
        <Carousel items={followArtists} />
      </div>

      <div>
        <h1 className="font-bold text-xl mt-12 mb-4">Saved tracks</h1>
        {isLoading && <Loading />}

        {savedTracks?.length > 0 && !isLoading && (
          <>
            {savedTracks.map((item: SavedTrack, index: number) => (
              <ListItem
                key={index}
                index={index}
                track={item.track}
                showIndex={false}
              />
            ))}

            <button onClick={fetchNextPage} className="w-full mt-8 mb-4 font-bold">
              show more
              <FontAwesomeIcon icon={faCaretDown} className="text-lg ml-2" />
            </button>
          </>
        )}

        {!savedTracks.length && !isLoading && (
          <p className="flex justify-center items-center pb-12">No data</p>
        )}
      </div>
    </main>
  );
}
