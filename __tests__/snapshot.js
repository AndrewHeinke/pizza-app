import React from "react";
import renderer from "react-test-renderer";
import Index from "../pages/index";

it("renders homepage unchanged", () => {
  const tree = renderer.create(<Index user={{ isLoggedIn: true }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
