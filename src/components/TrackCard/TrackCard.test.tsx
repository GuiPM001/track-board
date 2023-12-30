import { render } from "@testing-library/react";
import TrackCard from "./TrackCard";
import { Artist } from "interfaces/Artist";

const artistsMock: Artist[] = [
  {
    id: "1",
    name: "Aritst 1",
    external_urls: { spotify: "artist-url" },
    images: [{ url: "image-uri", height: 150, width: 150 }],
  },
];

const mockTrack = {
  id: "1",
  name: "Track name",
  artists: artistsMock,
  image: "image-url",
  link: "TrackLink"
};

test("renders component with provided props", () => {
  const { getByText } = render(
    <TrackCard {...mockTrack} />
  );

  expect(getByText("Track name")).toBeInTheDocument();
});
