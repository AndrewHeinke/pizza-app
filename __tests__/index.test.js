import Home from "../pages/index";
import { render } from "@testing-library/react";

describe("The Home Page Component", () => {
  it("should have exactly 1 `main` section", () => {
    const { container } = render(<Home user={{ isLoggedIn: true }} />);
    const banner = container.querySelector(".homepage-banner-wrapper");

    expect(banner).toBeInTheDocument();
  });
});
