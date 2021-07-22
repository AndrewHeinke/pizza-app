import React from "react";
import { render } from "@testing-library/react";
import ActiveLink from "../components/ActiveLink";
import * as nextRouter from "next/router";
import { Button } from "@material-ui/core";

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));

describe("ActiveLink Component", () => {
  it("should render", () => {
    render(
      <ActiveLink
        activeClassName="MuiButton-textPrimary"
        href="/order"
        passHref
      >
        <Button>Order</Button>
      </ActiveLink>
    );
  });

  it("should pass href value to child component", () => {
    const { getByText } = render(
      <ActiveLink
        activeClassName="MuiButton-textPrimary"
        href="/order"
        passHref
      >
        <Button>Order</Button>
      </ActiveLink>
    );
    expect(document.querySelector("a").getAttribute("href")).toBe("/order");
  });
});
