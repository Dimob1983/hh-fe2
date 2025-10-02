import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as api from "../api/getData";
import VacanciesList from "../components/VacanciesList";

const allVacancies = [
  {
    id: "1",
    name: "Frontend Developer",
    employer: { name: "Company X" },
    area: { name: "Москва" },
    salary: { from: 100000, to: 150000, currency: "RUR" },
    experience: { name: "1–3 года" },
    schedule: { name: "Удалённая работа" },
    alternate_url: "https://hh.ru/vacancy/1",
    key_skills: [{ name: "React" }, { name: "TypeScript" }],
  },
  {
    id: "2",
    name: "Backend Developer",
    employer: { name: "Company Y" },
    area: { name: "Санкт-Петербург" },
    salary: { from: 120000, to: 180000, currency: "RUR" },
    experience: { name: "3–5 лет" },
    schedule: { name: "Офис" },
    alternate_url: "https://hh.ru/vacancy/2",
    key_skills: [{ name: "Node.js" }, { name: "Express" }],
  },
];

vi.spyOn(api, "getData").mockImplementation(async (params) => {
  let items = allVacancies;

  if (params?.area === "1") {
    items = items.filter(v => v.area.name === "Москва");
  }
  if (params?.area === "2") {
    items = items.filter(v => v.area.name === "Санкт-Петербург");
  }

  return {
    items,
    found: items.length,
    pages: 1,
    page: 0,
  };
});

describe("VacanciesList", () => {
  it("фильтрует вакансии по городу", async () => {
    render(<VacanciesList />);

    await waitFor(() => screen.getByText(/Frontend Developer/));
    await waitFor(() => screen.getByText(/Backend Developer/));

    const citySelect = screen.getByDisplayValue("Все");
    fireEvent.change(citySelect, { target: { value: "1" } });

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/)).toBeInTheDocument();
      expect(screen.queryByText(/Backend Developer/)).not.toBeInTheDocument();
    });

    fireEvent.change(citySelect, { target: { value: "2" } });

    await waitFor(() => {
      expect(screen.queryByText(/Frontend Developer/)).not.toBeInTheDocument();
      expect(screen.getByText(/Backend Developer/)).toBeInTheDocument();
    });
  });
});
