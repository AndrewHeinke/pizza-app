import React from "react";
import { render } from "@testing-library/react";
import Layout from "../Layout";
import * as nextRouter from "next/router";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

describe("Layout Component", () => {
  it("should render", () => {
    render(<Layout />);
  });
});
