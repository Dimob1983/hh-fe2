import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Filters from "../components/Filters";

describe("Filters", () => {
  it("добавляет новый навык", () => {
    const setSkills = vi.fn();
    const setCity = vi.fn();
    const skills: string[] = [];

    render(<Filters skills={skills} setSkills={setSkills} city="all" setCity={setCity} />);

    const inputSkill = screen.getByPlaceholderText("Добавить навык");
    fireEvent.change(inputSkill, { target: { value: "React" } });
    fireEvent.keyDown(inputSkill, { key: "Enter" });

    expect(setSkills).toHaveBeenCalledTimes(1);

    const fn = setSkills.mock.calls[0][0];
    const result = fn([]);
    expect(result).toEqual(["React"]);
  });

  it("изменяет город", () => {
    const setSkills = vi.fn();
    const setCity = vi.fn();
    const skills: string[] = [];

    render(<Filters skills={skills} setSkills={setSkills} city="all" setCity={setCity} />);

    const select = screen.getByDisplayValue("Все");
    fireEvent.change(select, { target: { value: "1" } });

    expect(setCity).toHaveBeenCalledWith("1");
  });
});
