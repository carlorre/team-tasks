import React from "react";
import { render, act } from "@testing-library/react";
import TaskList from "./TaskList";

const list = {
  title: "Shopping",
  id: "123",
};

describe("App", () => {
  test("renders App component", async () => {
    const promise = Promise.resolve();
    render(<TaskList list={list} />);
    await act(() => promise);
  });
});
