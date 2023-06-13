import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../interfaces/UserProfile';
import { getProfile, getTopTracks } from '../../services/Spotify';
import Loading from '../../components/Loading';
import './style.scss';

function Profile() {
  const [user, setUser] = useState<UserProfile>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    getProfile()
      .then((response: UserProfile) => {
        setUser(response)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <div className='profile_container'>
      {loading && <Loading />}
      <div className='user_info'>
        <div className='user_name'>
          <img src={user?.images[0].url}/>
          <h1>{user?.display_name}</h1>
        </div>
        <div className='grid'>
          <span>User ID: {user?.id}</span>
          <span>Subscription: {user?.product}</span>
        </div>
        <div className='grid'>
          <span>Followers: {user?.followers.total}</span>
          <span>Email: {user?.email}</span>
        </div>
      </div>
    </div>
  )
}

export default Profile;