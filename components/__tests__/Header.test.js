import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

describe("Header Component", () => {
  it("should render component", () => {
    render(<Header />);
  });
});
