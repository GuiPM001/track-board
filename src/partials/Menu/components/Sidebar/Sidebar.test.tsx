import { render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { BrowserRouter } from "react-router-dom";

test("renders the component with sections and links", () => {
  const { getByText, getByAltText } = render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );

    // Logo
  const logoImage = getByAltText("Logo");
  expect(logoImage).toBeInTheDocument();

  // Menu Section
  expect(getByText("Menu")).toBeInTheDocument();
  expect(getByText("home")).toBeInTheDocument();
  expect(getByText("profile")).toBeInTheDocument();

  // Library Section
  expect(getByText("Library")).toBeInTheDocument();
  expect(getByText("recent")).toBeInTheDocument();
  expect(getByText("favorites")).toBeInTheDocument();

  // Playlist Section
  expect(getByText("Playlist")).toBeInTheDocument();
  expect(getByText("playlists")).toBeInTheDocument();
  expect(getByText("suggestion")).toBeInTheDocument();

  // General Section
  expect(getByText("General")).toBeInTheDocument();
  expect(getByText("log out")).toBeInTheDocument();
})