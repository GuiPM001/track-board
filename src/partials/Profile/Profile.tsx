import { useContext, useEffect, useState } from "react";
import profileService from "services/Spotify/Profile";
import { UserProfile } from "interfaces/UserProfile";
import { SnackbarContext } from "providers/SnackbarProvider";
import noPhoto from "assets/no-photo.png";

export default function Profile() {
  const [user, setUser] = useState<UserProfile>();
  const { openSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await profileService.getProfile();
        setUser(response);
      } catch (e) {
        openSnackbar(`Error fetching profile information: ${e}`, "error");
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="h-3/6 w-full pb-3">
      <h1 className="font-bold text-lg">Profile</h1>
      <div className="flex flex-col justify-center items-center">
        <img
          className="rounded-2xl w-36 mt-8"
          src={user?.images[1]?.url ? user?.images[1].url : noPhoto}
        />

        <div className="px-4">
          <div className="w-full flex items-center justify-between my-8">
            <span className="text-lg font-semibold">{user?.display_name}</span>
            <div className="h-px w-1 bg-slate-500"></div>
            <span>{user?.followers.total} followers</span>
          </div>

          <p className="mb-2">Email: {user?.email}</p>
          <p>Subscription: {user?.product}</p>
        </div>
      </div>
    </section>
  );
}
