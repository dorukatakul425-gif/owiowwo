import { useState } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { BoostersPopup } from "@/components/boosters-popup";

afterEach(cleanup);

function OpenBoosters() {
  const [open, setOpen] = useState(true);
  return <BoostersPopup open={open} onOpenChange={setOpen} />;
}

describe("Independent booster explanation dismissal", () => {
  it.each(["Ehtiraslı öpüş", "Üzə şillə", "Liqa xallarını ikiqat artırma", "Liqa limitini artırma", "Əlavə liqa xalları"])("opens %s and closes only its detail", async (title) => {
    render(<OpenBoosters />);
    fireEvent.click(screen.getByRole("button", { name: `${title}: 0` }));
    expect(screen.getByRole("dialog", { name: title })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Gücləndirici təfərrüatını bağla" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: title })).toBeNull());
    expect(screen.getByRole("dialog", { name: "Gücləndiricilər" })).toBeTruthy();
  });

  it.each(["Liqa xallarını ikiqat artırma", "Liqa limitini artırma", "Əlavə liqa xalları"])("disables activation for zero %s boosters", (title) => {
    render(<OpenBoosters />);
    fireEvent.click(screen.getByRole("button", { name: `${title}: 0` }));
    expect(screen.getByRole("button", { name: "Aktivləşdir" })).toBeDisabled();
  });

  it("closes only the explanation when its X is clicked", async () => {
    render(<OpenBoosters />);
    fireEvent.click(screen.getByRole("button", { name: "Gücləndiricilər haqqında" }));
    expect(screen.getByRole("dialog", { name: "Gücləndiricilər nədir?" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Gücləndirici açıqlamasını bağla" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Gücləndiricilər nədir?" })).toBeNull());
    expect(screen.getByRole("dialog", { name: "Gücləndiricilər" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Gücləndiriciləri bağla" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});