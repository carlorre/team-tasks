import React from "react";
import { render } from "@testing-library/react";
import SignIn from "./SignIn";

describe("App", () => {
  test("renders App component", () => {
    render(<SignIn />);
  });
});
