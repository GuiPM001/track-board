import { render, waitFor } from '@testing-library/react';
import Profile from './index';
import profileService from '../../services/Spotify/Profile';
import { UserProfile } from '../../interfaces/UserProfile';
import artistService from '../../services/Spotify/Artist';
import { Artist } from '../../interfaces/Artist';
import { Image } from '../../interfaces/Image';
import { SnackbarContext } from '../../providers/SnackbarProvider';

jest.mock('../../services/Spotify/Profile', () => ({
  getProfile: jest.fn()
}));

jest.mock('../../services/Spotify/Artist', () => ({
  getFollowArtists: jest.fn()
}));

const imagesMock: Image[] = [
  {url: 'image1', height: 50, width: 50}, 
  {url: 'image2', height: 100, width: 100}, 
  {url: 'image', height: 150, width: 150}
];

const profileMock: UserProfile = {
  id: '123',
  display_name: 'User Test',
  email: 'ameil@test.com',
  product: 'premium',
  images: imagesMock,
  followers: { href: 'link', total: 5}
}

const artistsMock: Artist[] = [
  {
    id: 'ABC',
    name: 'Artist Test',
    images: imagesMock,
    uri: 'spotify.com/artist'
  }
]

describe('Profile', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch profile data and follow artists when render component', async () => {
    render(<Profile />);

    jest.spyOn(profileService, 'getProfile');
    jest.spyOn(artistService, 'getFollowArtists');

    await waitFor(() => {
      expect(profileService.getProfile).toHaveBeenCalled();
      expect(artistService.getFollowArtists).toHaveBeenCalled();
    });
  });

  test('should show profile data and follow artists in screen when api response success', async () => {
    
    jest.spyOn(profileService, 'getProfile').mockReturnValue(Promise.resolve(profileMock));
    jest.spyOn(artistService, 'getFollowArtists').mockReturnValue(Promise.resolve(artistsMock));
    
    const { getByText, getByPlaceholderText } = render(<Profile />);

    await waitFor(() => {
      expect(getByText(profileMock.display_name)).toBeInTheDocument();
      expect(getByPlaceholderText(artistsMock[0].uri)).toBeInTheDocument();
    });
  });

  test('should show error snackbar when some api response error', async () => {
    jest.spyOn(profileService, 'getProfile').mockReturnValue(Promise.reject(new Error('error fetching data')));
    jest.spyOn(artistService, 'getFollowArtists').mockReturnValue(Promise.resolve(artistsMock));
    
    const openSnackbarMock = jest.fn()

    render(
      <SnackbarContext.Provider value={{ openSnackbar: openSnackbarMock }}>
        <Profile />
      </SnackbarContext.Provider>
    );

    await waitFor(() => {
      expect(openSnackbarMock).toHaveBeenCalled();
    });
  });
});
