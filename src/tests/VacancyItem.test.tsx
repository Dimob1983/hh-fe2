import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VacancyItem from "../components/VacancyItem";
import type { Vacancy } from "../types";

const vacancy: Vacancy = {
  id: "1",
  name: "Frontend Developer",
  employer: { name: "Company X" },
  area: { name: "Москва" },
  salary: { from: 100000, to: 150000, currency: "RUR" },
  experience: { name: "1–3 года" },
  schedule: { name: "Удалённая работа" },
  alternate_url: "https://hh.ru/vacancy/1",
  key_skills: [{ name: "React" }, { name: "TypeScript" }],
};

describe("VacancyItem", () => {
  it("рендерит название и компанию", () => {
    render(<VacancyItem vacancy={vacancy} />);
    expect(screen.getByText(/Frontend Developer/)).toBeInTheDocument();
    expect(screen.getByText(/Company X/)).toBeInTheDocument();
  });

  it("рендерит зарплату", () => {
    render(<VacancyItem vacancy={vacancy} />);
    expect(screen.getByText(/100000 - 150000 RUR/)).toBeInTheDocument();
  });

  it("ссылка 'Откликнуться' ведет на hh.ru", () => {
    render(<VacancyItem vacancy={vacancy} />);
    const link = screen.getByRole("link", { name: /Откликнуться/ });
    expect(link).toHaveAttribute("href", vacancy.alternate_url);
  });
});
