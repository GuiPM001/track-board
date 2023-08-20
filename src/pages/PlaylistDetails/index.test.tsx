import PlaylistDetails from ".";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Image } from "../../interfaces/Image";
import { Playlist } from "../../interfaces/Playlist";
import playlistService from "../../services/Spotify/Playlist";
import { BrowserRouter } from "react-router-dom";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import * as router from "react-router";
import { Artist } from "../../interfaces/Artist";

jest.mock('../../services/Spotify/Playlist', () => ({
  getPlaylistDetails: jest.fn()
}));

const navigateMock = jest.fn();

const imagesMock: Image[] = [
  {url: 'image1', height: 50, width: 50}, 
  {url: 'image2', height: 100, width: 100}, 
  {url: 'image', height: 150, width: 150}
];

const playlistMock: Playlist = { id: '123', name: 'Playlist 1', owner: { display_name: 'Owner' }, public: true, tracks: {total: 0 }, images: imagesMock };

describe('PlaylistDetails', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch playlist details when render component', async () => {
    jest.spyOn(playlistService, 'getPlaylistDetails').mockReturnValue(Promise.resolve(playlistMock));

    render(
      <BrowserRouter>
        <PlaylistDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(playlistService.getPlaylistDetails).toHaveBeenCalled();
    });
  });

  test('should show error snackbar when some api response error', async () => {
    jest.spyOn(playlistService, 'getPlaylistDetails').mockReturnValue(Promise.reject(new Error('error fetching data')));

    const openSnackbarMock = jest.fn()

    render(
      <SnackbarContext.Provider value={{ openSnackbar: openSnackbarMock }}>
        <BrowserRouter>
          <PlaylistDetails />
        </BrowserRouter>
      </SnackbarContext.Provider>
    );

    await waitFor(() => {
      expect(openSnackbarMock).toHaveBeenCalled();
    });
  });

  test('should show message when playlist has no tracks', async () => {
    jest.spyOn(playlistService, 'getPlaylistDetails').mockReturnValue(Promise.resolve(playlistMock));

    const { getByText } = render(
      <BrowserRouter>
        <PlaylistDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText('Playlist has no tracks')).toBeInTheDocument();
    })
  });

  test('should show tracks details when playlist tracks', async () => {
    let artistMock: Artist[] = [{id: '123', name: 'Test', uri: 'www.test.com', images: []}]
    playlistMock.tracks.items = [{track: {id: '123', name: 'Mock track', duration_ms: 150, artists: artistMock}}]
    jest.spyOn(playlistService, 'getPlaylistDetails').mockReturnValue(Promise.resolve(playlistMock));

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <PlaylistDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByTestId('track-list')).toBeInTheDocument();
      expect(getByText('Mock track')).toBeInTheDocument();
    })
  });

  test('should go to /playliss page when click in back button', async () => {
    jest.spyOn(playlistService, 'getPlaylistDetails').mockReturnValue(Promise.resolve(playlistMock));
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock);

    const { getByTestId } = render(
      <BrowserRouter>
        <PlaylistDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      const button = getByTestId('back-button');
      fireEvent.click(button);

      expect(navigateMock).toHaveBeenCalledWith('/playlists');
    })
  });
});