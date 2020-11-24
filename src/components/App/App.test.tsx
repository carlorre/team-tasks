import React from "react";
import { render, act } from "@testing-library/react";
import App from "./App";

test("renders the correct content", async () => {
  const promise = Promise.resolve();
  const { getByText } = render(<App />);
  await act(() => promise);

  getByText("SignIn");
});
