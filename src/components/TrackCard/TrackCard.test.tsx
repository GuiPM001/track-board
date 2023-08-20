import { render } from "@testing-library/react";
import TrackCard from "./TrackCard";
import { Artist } from "interfaces/Artist";

const artistsMock: Artist[] = [
  {
    id: "1",
    name: "Aritst 1",
    uri: "artist-uri",
    images: [{ url: "image-uri", height: 150, width: 150 }],
  },
];

const mockTrack = {
  id: "1",
  name: "Track name",
  artists: artistsMock,
  image: "image-url",
};

test("renders component with provided props", () => {
  const { getByText, getByTestId } = render(
    <TrackCard {...mockTrack} />
  );

  expect(getByTestId("trackImage")).toHaveStyle(
    `backgroundImage: url(${mockTrack.image})`
  );
  expect(getByText("Track name")).toBeInTheDocument();
});
