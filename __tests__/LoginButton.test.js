import React from "react";
import { render } from "@testing-library/react";
import LoginButton from "../components/LoginButton";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

describe("LoginButton Component", () => {
  test("should render component", () => {
    render(<LoginButton isLoggedIn={false} />);
  });

  test("should render button testh log in test if user is not logged in", () => {
    const { getByText } = render(<LoginButton isLoggedIn={true} />);
    const buttonElement = getByText(/Sign out/);
    expect(buttonElement).toBeInTheDocument();
  });

  test("should render button with log in test if user is not logged in", () => {
    const { getByText } = render(<LoginButton isLoggedIn={false} />);
    const buttonElement = getByText(/Log in/);
    expect(buttonElement).toBeInTheDocument();
  });
});
