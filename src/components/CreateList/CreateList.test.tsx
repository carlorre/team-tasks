import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import CreateList from "./CreateList";

describe("App", () => {
  test("renders App component", () => {
    const user = { uid: "123" };
    render(<CreateList user={user} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Shopping List" },
    });

    fireEvent.click(screen.getByRole("button"));
  });
});
