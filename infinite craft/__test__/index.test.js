import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "node:test";
import React from "react";
import CustomContainedButton from "../src/components/common/CustomContainedButton";

describe("Home", () => {
  it("renders a heading", () => {
    render(<CustomContainedButton text="asd" />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
