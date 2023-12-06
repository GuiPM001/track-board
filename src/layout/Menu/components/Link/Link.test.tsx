import { render } from "@testing-library/react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";
import Link from "./Link";

const mockProps = {
  icon: faHome,
  name: "Home",
  route: "/home",
};

test("renders the component with props", () => {
  const { getByText, getByRole } = render(
    <BrowserRouter>
      <Link {...mockProps} />
    </BrowserRouter>
  );

  expect(getByText("Home")).toBeInTheDocument();
  expect(getByRole("link")).toHaveAttribute("href", "/home");
});