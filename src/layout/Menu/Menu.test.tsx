import { fireEvent, render } from "@testing-library/react";
import Menu from "./Menu"
import { BrowserRouter } from "react-router-dom";

test("toggle menu when button is clicked", () => {
  const { getByTestId, queryByTestId } = render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );

  const openButton = getByTestId("openMenuBtn");
  
  fireEvent.click(openButton);
  expect(queryByTestId("mobileMenu")).toBeVisible();

  const closeButton = getByTestId("closeMenuBtn");
  
  fireEvent.click(closeButton);
  expect(queryByTestId("mobileMenu")).toBeNull();
})