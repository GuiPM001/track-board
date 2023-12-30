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

  expect(getByText("Library")).toBeInTheDocument();
  expect(getByText("home")).toBeInTheDocument();
  expect(getByText("recent")).toBeInTheDocument();
  expect(getByText("favorites")).toBeInTheDocument();
})