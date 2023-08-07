import { fireEvent, render, waitFor } from "@testing-library/react";
import Playlists from ".";
import playlistService from "../../services/Spotify/Playlist";
import { Playlist } from "../../interfaces/Playlist";
import { Image } from "../../interfaces/Image";
import { SnackbarContext } from "../../providers/SnackbarProvider";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router";

jest.mock('../../services/Spotify/Playlist', () => ({
  getPlaylists: jest.fn()
}));

const navigateMock = jest.fn();

const imagesMock: Image[] = [
  {url: 'image1', height: 50, width: 50}, 
  {url: 'image2', height: 100, width: 100}, 
  {url: 'image', height: 150, width: 150}
];

const playlistsMock: Playlist[] = [
  { id: '123', name: 'Playlist 1', owner: { display_name: 'Owner' }, public: true, tracks: {total: 0 }, images: imagesMock },
  { id: '456', name: 'Playlist 2', owner: { display_name: 'Owner' }, public: true, tracks: {total: 0 }, images: imagesMock },
  { id: '789', name: 'Playlist 3', owner: { display_name: 'Owner' }, public: true, tracks: {total: 0 }, images: imagesMock }
]

describe ('Playlists', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch list of playlists when render component', async () => {
    jest.spyOn(playlistService, 'getPlaylists').mockReturnValue(Promise.resolve(playlistsMock));

    render(
      <BrowserRouter>
        <Playlists />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(playlistService.getPlaylists).toHaveBeenCalled();
    });
  });

  test('should show playlist data in screen when api response success', async () => {
    jest.spyOn(playlistService, 'getPlaylists').mockReturnValue(Promise.resolve(playlistsMock));
    
    const { getByText } = render(
      <BrowserRouter>
        <Playlists />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(getByText('Playlist 1')).toBeInTheDocument();
      expect(getByText('Playlist 2')).toBeInTheDocument();
      expect(getByText('Playlist 3')).toBeInTheDocument();
    });
  });

  test('should show error snackbar when some api response error', async () => {
    jest.spyOn(playlistService, 'getPlaylists').mockReturnValue(Promise.reject(new Error('error fetching data')));
    
    const openSnackbarMock = jest.fn();

    render(
      <SnackbarContext.Provider value={{ openSnackbar: openSnackbarMock }}>
        <BrowserRouter>
          <Playlists />
        </BrowserRouter>
      </SnackbarContext.Provider>
    );

    
    await waitFor(() => {
      expect(openSnackbarMock).toHaveBeenCalled();
    });
  });

  test('should got to playlist details click in playlist item', async () => {
    jest.spyOn(playlistService, 'getPlaylists').mockReturnValue(Promise.resolve(playlistsMock));
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock);

    const { getByText } = render(
      <BrowserRouter>
        <Playlists />
      </BrowserRouter>
    );

    await waitFor(() => {
      const listItem = getByText('Playlist 1');
      fireEvent.click(listItem);

      expect(navigateMock).toHaveBeenCalledWith('/playlist/123');
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });
  });
});