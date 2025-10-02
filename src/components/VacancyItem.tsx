import { Link } from 'react-router-dom';
import type { Vacancy } from '../types';
import styles from './VacancyItem.module.css';

interface Props {
  vacancy: Vacancy;
}

export default function VacancyItem({ vacancy }: Props) {
  const skills = vacancy.key_skills?.length
    ? vacancy.key_skills.map(k => k.name).join(', ')
    : 'Не указаны';

  const experience = vacancy.experience?.name ?? 'Не указан';
  const workMode = vacancy.schedule?.name ?? '';
  const salary =
    vacancy.salary?.from || vacancy.salary?.to
      ? `${vacancy.salary?.from ?? ''} - ${vacancy.salary?.to ?? ''} ${vacancy.salary?.currency ?? ''}`
      : 'Не указана';

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{vacancy.name}</h3>
      <p className={styles.salary}>Зарплата: {salary}</p>
      <p className={styles.experience}>Опыт: {experience}</p>
      {workMode && <span className={styles.tag}>{workMode}</span>}
      <p className={styles.company}>Компания: {vacancy.employer?.name}</p>
      <p className={styles.city}>Город: {vacancy.area?.name}</p>
      <p className={styles.skills}>Навыки: {skills}</p>
      <div className={styles.buttons}>
        <Link to={`/vacancies/${vacancy.id}`}>
          <button>Смотреть вакансию</button>
        </Link>
        {vacancy.alternate_url && (
          <a href={vacancy.alternate_url} target="_blank" rel="noopener noreferrer">
            <button>Откликнуться</button>
          </a>
        )}
      </div>
    </div>
  );
}
