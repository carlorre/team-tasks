import React from "react";
import { render, act } from "@testing-library/react";
import TaskInput from "./TaskInput";

describe("App", () => {
  test("renders App component", async () => {
    const promise = Promise.resolve();
    render(<TaskInput listId={"123"} />);
    await act(() => promise);
  });
});
