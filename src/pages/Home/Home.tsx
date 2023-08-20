import RecentPlayed from "./components/RecentPlayed/RecentPlayed";
import Recommendations from "./components/Recommendations/Recommendations";
import TopTracks from "./components/TopTracks/TopTracks";

export default function Home() {
  return (
    <>
      <TopTracks />
      <Recommendations />
      <RecentPlayed />
    </>
  )
}