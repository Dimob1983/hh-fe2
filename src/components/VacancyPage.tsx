import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVacancyById } from '../api/getData';
import type { Vacancy } from '../types';

export default function VacancyPage() {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getVacancyById(id)
      .then(v => {
        setVacancy(v);
        setLoading(false);
      })
      .catch(err => {
        setError("Ошибка при загрузке вакансии");
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  if (loading) return <p>Загрузка вакансии...</p>;
  if (error) return <p>{error}</p>;
  if (!vacancy) return <p>Вакансия не найдена</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>{vacancy.name}</h1>
      <p>Компания: {vacancy.employer?.name}</p>
      <p>Город: {vacancy.area?.name}</p>
      <p>Опыт: {vacancy.experience?.name ?? 'Не указан'}</p>
      <p>
        Зарплата: {vacancy.salary?.from || vacancy.salary?.to
          ? `${vacancy.salary?.from ?? ''} - ${vacancy.salary?.to ?? ''} ${vacancy.salary?.currency ?? ''}`
          : 'Не указана'}
      </p>
      <p>Навыки: {vacancy.key_skills?.map(k => k.name).join(', ') ?? 'Не указаны'}</p>
      {vacancy.snippet && (
        <>
          <h3>Описание вакансии:</h3>
          <div dangerouslySetInnerHTML={{ __html: vacancy.snippet.requirement ?? '' }} />
        </>
      )}
      <a href={vacancy.alternate_url} target="_blank" rel="noopener noreferrer">
        Перейти к вакансии
      </a>
    </div>
  );
}
