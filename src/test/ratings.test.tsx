import { useState } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RatingsPopup } from "@/components/ratings-popup";
import { getRatingPlayers, INITIAL_VISIBLE_PLAYERS } from "@/lib/ratings";
afterEach(cleanup);
function OpenRatings() { const [open, setOpen] = useState(true); return <RatingsPopup open={open} onOpenChange={setOpen} />; }
describe("Rating limits and controls", () => {
  it("caps all period lists at 50 players", () => {
    for (const period of ["all", "month", "week", "today"] as const) {
      const players = getRatingPlayers(["avatar"], period, "kiss");
      expect(players).toHaveLength(50);
      expect(players[49]?.position).toBe(50);
    }
  });
  it("keeps nine players in the initial reference group", () => {
    expect(INITIAL_VISIBLE_PLAYERS).toBe(9);
    expect(getRatingPlayers(["avatar"], "all", "kiss").slice(0, INITIAL_VISIBLE_PLAYERS).map(p => p.position)).toEqual([1,2,3,4,5,6,7,8,9]);
  });
  it("closes only help", async () => {
    render(<OpenRatings />);
    fireEvent.click(screen.getByRole("button", { name: "Reytinq haqqında" }));
    fireEvent.click(screen.getByRole("button", { name: "Reytinq açıqlamasını bağla" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Reytinqləri bağla" })).toBeTruthy());
    expect(screen.queryByRole("button", { name: "Aydındır" })).toBeNull();
    expect(screen.getByLabelText("Sizin reytinqiniz")).toHaveTextContent("1038.");
  });
  it("changes demonstration scores for different periods", () => {
    expect(getRatingPlayers(["avatar"], "today", "kiss")[0]?.points).toBe(8531);
    expect(getRatingPlayers(["avatar"], "all", "kiss")[0]?.points).toBe(2132938);
  });
  it("opens the period selector on click without dismissing ratings", () => {
    render(<OpenRatings />);
    fireEvent.click(screen.getByRole("button", { name: "Reytinq dövrü" }));
    expect(screen.getAllByRole("menuitemradio")).toHaveLength(4);
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Bu gün" }));
    expect(screen.getByRole("button", { name: "Reytinqləri bağla" })).toBeTruthy();
  });
});