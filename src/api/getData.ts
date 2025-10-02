import type { HHResponse, Vacancy } from '../types';

interface Params {
  text?: string;
  area?: string;
  skill_set?: string[];
  page?: number;
  per_page?: number;
}

export async function getData(params: Params = {}): Promise<HHResponse> {
  const query = new URLSearchParams();

  if (params.text || params.skill_set) {
    const textQuery = [params.text, ...(params.skill_set || [])].join(" ");
    query.append("text", textQuery);
  }

  if (params.area && params.area !== "all") {
    query.append("area", params.area);
  }

  query.append("page", String(params.page || 0));
  query.append("per_page", String(params.per_page || 10));
  query.append("fields", "name,salary,alternate_url,area,employer,key_skills,schedule,experience,snippet");

  const res = await fetch(`https://api.hh.ru/vacancies?${query.toString()}`);
  if (!res.ok) throw new Error("Ошибка сети: " + res.status);
  return res.json();
}

export async function getVacancyById(id: string): Promise<Vacancy> {
  const res = await fetch(`https://api.hh.ru/vacancies/${id}`);
  if (!res.ok) throw new Error("Ошибка сети: " + res.status);
  return res.json();
}
