import { SnackbarContext } from "providers/SnackbarProvider";
import Profile from "./Profile";
import { render, waitFor } from "@testing-library/react";
import { UserProfile } from "interfaces/UserProfile";
import profileService from "services/Spotify/Profile";

jest.mock("services/Spotify/Profile", () => ({
  getProfile: jest.fn(),
}));

const userProfileMock: UserProfile = {
  id: "1",
  display_name: "User name",
  email: "name@mock.com",
  followers: { total: 5 },
  product: "premium",
  images: [
    { url: "image-mock-url", height: 150, width: 150 },
    { url: "image-mock-url", height: 150, width: 150 },
  ],
};

const openSnackbarMock = jest.fn();

function renderComponent() {
  return render(
    <SnackbarContext.Provider value={{ openSnackbar: openSnackbarMock }}>
      <Profile />
    </SnackbarContext.Provider>
  );
}

beforeEach(() => jest.restoreAllMocks());

test("fetch profile data when rendering component", async () => {
  renderComponent();

  await waitFor(() => {
    expect(profileService.getProfile).toHaveBeenCalled();
  });
});

test("show profile data when api responde success", async () => {
  jest.spyOn(profileService, "getProfile").mockResolvedValue(userProfileMock);

  const { getByText } = renderComponent();

  await waitFor(() => {
    expect(getByText("User name")).toBeInTheDocument();
    expect(getByText("Email: name@mock.com")).toBeInTheDocument();
    expect(getByText("Subscription: premium")).toBeInTheDocument();
  });
});

test("show snackbar error when api responde error", async () => {
  jest
    .spyOn(profileService, "getProfile")
    .mockRejectedValue(new Error("erro fetching data"));

  renderComponent();

  await waitFor(() => {
    expect(openSnackbarMock).toHaveBeenCalled();
  });
});
