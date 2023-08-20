import { fireEvent, render } from "@testing-library/react";
import PlayButton from "./PlayButton";
import { PlayerContext } from "providers/PlayerProvider";

test("calls changeTrack when clicked", () => {
  const changeTrackMock = jest.fn();
  const trackIdMock = '123';

  const { getByRole } = render(
    <PlayerContext.Provider
      value={{ changeTrack: changeTrackMock, trackId: trackIdMock }}
    >
      <PlayButton trackId={trackIdMock} />
    </PlayerContext.Provider>
  );

  const playButton = getByRole("button");
  fireEvent.click(playButton);

  expect(changeTrackMock).toHaveBeenCalledWith(trackIdMock);
});
