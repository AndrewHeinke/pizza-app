import React from "react";
import { render } from "@testing-library/react";
import Banner from "../components/Banner";

describe("Banner Component", () => {
  test("should render Banner component", () => {
    const { getByText } = render(<Banner isLoggedIn={true} />);
    const titleElement = getByText(/The Pizza Shop/);
    expect(titleElement).toBeInTheDocument();
  });

  test("should render order pizza button if user is logged in", () => {
    const { getByText } = render(<Banner isLoggedIn={true} />);
    const linkElement = getByText(/Order Pizza/);
    expect(linkElement).toBeInTheDocument();
  });

  test("should render log in button if user is not logged in", () => {
    const { getByText } = render(<Banner isLoggedIn={false} />);
    const linkElement = getByText(/Log in/);
    expect(linkElement).toBeInTheDocument();
  });
});
