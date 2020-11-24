import React from "react";
import { render } from "@testing-library/react";
import SignOut from "./SignOut";

describe("App", () => {
  test("renders App component", () => {
    render(<SignOut />);
  });
});
