import { fireEvent, render } from "@testing-library/react";
import Container from "./Container";
import { Track } from "interfaces/Track";

const mockItems: Track[] = [
  {
    id: "1",
    name: "Track 1",
    duration_ms: 150,
    artists: [],
    album: { images: [] },
    external_urls: { spotify: '' }
  },
  {
    id: "2",
    name: "Track 2",
    duration_ms: 150,
    artists: [],
    album: { images: [] },
    external_urls: { spotify: '' }
  },
  {
    id: "3",
    name: "Track 3",
    duration_ms: 150,
    artists: [],
    album: { images: [] },
    external_urls: { spotify: '' }
  },
  {
    id: "4",
    name: "Track 4",
    duration_ms: 150,
    artists: [],
    album: { images: [] },
    external_urls: { spotify: '' }
  },
  {
    id: "5",
    name: "Track 5",
    duration_ms: 150,
    artists: [],
    album: { images: [] },
    external_urls: { spotify: '' }
  },
];

function renderWithChildren() {
  return render(
    <Container title="Mock container" items={mockItems}>
      {mockItems.map((item) => (
        <div>{item.name}</div>
      ))}
    </Container>
  );
}

test("renders component with initial state", () => {
  const { getByText, queryByText } = render(
    <Container title="Mock container" items={[]} />
  );

  expect(getByText("Mock container")).toBeInTheDocument();
  expect(queryByText("See all")).not.toBeInTheDocument();
  expect(getByText("No data")).toBeInTheDocument();
});

test("renders component with items", () => {
  const { getByText } = renderWithChildren();

  expect(getByText("Mock container")).toBeInTheDocument();
  expect(getByText("See all")).toBeInTheDocument();
  expect(getByText("Track 1")).toBeInTheDocument();
});

test("shows all tracks when 'See all' button is clicked", () => {
  const { getByText, queryByText, getByTestId } = renderWithChildren();

  fireEvent.click(getByText("See all"));

  mockItems.forEach((item) => {
    expect(getByText(item.name)).toBeInTheDocument();
  });

  expect(queryByText("See all")).toBeNull();
  expect(getByTestId("seeLessBtn")).toBeInTheDocument();
});

test("shows limited tracks when 'See less' button is clicked", () => {
  const { getByText, getByTestId } = renderWithChildren();

  fireEvent.click(getByText("See all"));
  fireEvent.click(getByTestId("seeLessBtn"));

  mockItems.slice(0, 4).forEach((item) => {
    expect(getByText(item.name)).toBeInTheDocument();
  });
});
