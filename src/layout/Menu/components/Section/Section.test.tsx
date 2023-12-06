import { render } from "@testing-library/react";
import Section from "./Section";
import { LinkProps } from "../Link/Link";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter } from "react-router-dom";

const mockLinks: LinkProps[] = [
  { name: "Link 1", icon: faHouse, route: "/route-1" },
  { name: "Link 2", icon: faHouse, route: "/route-2" },
];

test("renders component with given title and links", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Section title="Mock section" links={mockLinks} />
    </BrowserRouter>
  );

  expect(getByText("Mock section")).toBeInTheDocument();
  expect(getByText("Link 1")).toBeInTheDocument();
  expect(getByText("Link 2")).toBeInTheDocument();
});
