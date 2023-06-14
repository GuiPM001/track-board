import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../interfaces/UserProfile';
import { getFollowArtists, getProfile, getTopTracks } from '../../services/Spotify';
import Loading from '../../components/Loading';
import './style.scss';
import { Artist } from '../../interfaces/Artist';

function Profile() {
  const [user, setUser] = useState<UserProfile>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);

    Promise.all([getProfile(), getFollowArtists()])
    .then(results => {
      setUser(results[0]);
      setArtists(results[1]);
      console.log(artists)
    })
    .catch((e) => {
      console.log(e);
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
        <img src={user?.images[0].url}/>
        <h1>{user?.display_name}</h1>
      </div>
      
      <div className='details'>
        <div className='info'>
          <div className='grid'>
            <p><span>User ID:</span> {user?.id}</p>
            <p><span>Subscription:</span> {user?.product}</p>
          </div>

          <div className='grid'>
            <p><span>Followers:</span> {user?.followers.total}</p>
            <p><span>Email:</span> {user?.email}</p>
          </div>
        </div>

        <div className='artists_container'>
          <p>Top artists</p>
          <div className='artists_row'>
            {
              artists.map(artist => 
                <a 
                  href={artist.uri} 
                  target="_blank" 
                  className='artist'
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