import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../api/getData';
import type { HHResponse, Vacancy } from '../types';
import Filters from './Filters';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import VacancyItem from './VacancyItem';

export default function VacanciesList() {
  const { city: cityParam } = useParams<{ city: string }>();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [skills, setSkills] = useState(['TypeScript', 'React', 'Redux']);
  const [searchText, setSearchText] = useState('');

  const cityCode = cityParam === 'moscow' ? '1'
                 : cityParam === 'petersburg' ? '2'
                 : undefined;

  const fetchVacancies = async () => {
    try {
      const data: HHResponse = await getData({
        page: page - 1,
        per_page: 10,
        skill_set: skills,
        area: cityCode,
        text: searchText || undefined,
      });
      setVacancies(data.items);
      setTotalPages(data.pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [page, skills, cityCode, searchText]);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchVacancies();
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Filters
        skills={skills}
        setSkills={setSkills}
        city={cityParam || 'moscow'}
      />

      <div style={{ flex: 1 }}>
        <SearchBar
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onSubmit={handleSearchSubmit}
        />

        <h2>Список вакансий по профессии Frontend-разработчик</h2>
        {vacancies.length === 0 && <p>Вакансии не найдены</p>}
        {vacancies.map(v => (
          <VacancyItem key={v.id} vacancy={v} />
        ))}

        <Pagination total={totalPages} page={page} onChange={setPage} />
      </div>
    </div>
  );
}
