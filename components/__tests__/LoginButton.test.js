import React from "react";
import { render } from "@testing-library/react";
import LoginButton from "../LoginButton";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

describe("LoginButton Component", () => {
  it("should render component", () => {
    render(<LoginButton isLoggedIn={false} />);
  });

  it("should render button with log in test if user is not logged in", () => {
    const { getByText } = render(<LoginButton isLoggedIn={true} />);
    const buttonElement = getByText(/Sign out/);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should render button with log in test if user is not logged in", () => {
    const { getByText } = render(<LoginButton isLoggedIn={false} />);
    const buttonElement = getByText(/Log in/);
    expect(buttonElement).toBeInTheDocument();
  });
});
