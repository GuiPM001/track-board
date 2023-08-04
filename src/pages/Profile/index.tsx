import React, { useContext, useEffect, useState } from 'react';
import { UserProfile } from '../../interfaces/UserProfile';
import Loading from '../../components/Loading';
import './style.scss';
import { Artist } from '../../interfaces/Artist';
import { SnackbarContext } from '../../providers/SnackbarProvider';
import artistService from '../../services/Spotify/Artist';
import profileService from '../../services/Spotify/Profile';

function Profile() {
  const [user, setUser] = useState<UserProfile>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>();

  const { openSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    setLoading(true);

    Promise.all([profileService.getProfile(), artistService.getFollowArtists()])
      .then(results => {
        setUser(results[0]);
        setArtists(results[1]);
      })
      .catch((e) => {
        openSnackbar(`Error fetching profile information: ${e}`, 'error');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  if (loading)
    return <Loading />

  return (
    <div className='profile_container'>
      <div className='user_overview'>
        <img src={user?.images[1].url}/>
        <h1>{user?.display_name}</h1>
      </div>
      
      <div className='details'>
        <div className='info'>
          <div className='grid'>
            <p><span>User ID:</span> {user?.id}</p>
            <p><span>Email:</span> {user?.email}</p>
          </div>

          <div className='grid'>
            <p><span>Subscription:</span> {user?.product}</p>
            <p><span>Followers:</span> {user?.followers.total}</p>
          </div>
        </div>

        <div className='artists_container'>
          <p>Top artists</p>
          <div className='artists_row'>
            {
              artists?.map(artist => 
                <a 
                  href={artist.uri} 
                  target='_blank'
                  className='artist'
                  placeholder={artist.uri}
                  key={artist.id}
                >
                  <img src={artist.images[2].url}/>
                </a>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;