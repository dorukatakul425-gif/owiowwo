import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactPopup } from "@/components/contact-popup";

describe("Contact email action", () => {
  it("opens a mail draft addressed to the requested recipient", () => {
    render(<ContactPopup open onOpenChange={() => {}} />);
    expect(screen.getByRole("link").getAttribute("href")).toBe("mailto:dorukatakul425@gmail.com");
  });
});