import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getData } from '../api/getData';
import type { HHResponse, Vacancy } from '../types';
import Filters from './Filters';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import VacancyItem from './VacancyItem';

export default function VacanciesList() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [skills, setSkills] = useState(['TypeScript', 'React', 'Redux']);
  const [city, setCity] = useState('all');
  const [searchText, setSearchText] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const cityParam = searchParams.get('city') || 'all';
    const skillsParam = searchParams.get('skills')?.split(',') || ['TypeScript', 'React', 'Redux'];
    const textParam = searchParams.get('text') || '';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    setCity(cityParam);
    setSkills(skillsParam);
    setSearchText(textParam);
    setPage(pageParam);
  }, []);

  useEffect(() => {
    setSearchParams({
      city,
      skills: skills.join(','),
      text: searchText,
      page: page.toString(),
    });
  }, [city, skills, searchText, page]);

  const fetchVacancies = async () => {
    try {
      const data: HHResponse = await getData({
        page: page - 1,
        per_page: 10,
        skill_set: skills,
        area: city !== 'all' ? city : undefined,
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
  }, [page, skills, city, searchText]);

  const handleSearchSubmit = () => {
    setPage(1);
    fetchVacancies();
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Filters
        skills={skills}
        setSkills={setSkills}
        city={city}
        setCity={setCity}
      />

      <div style={{ flex: 1 }}>
        <SearchBar
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onSubmit={handleSearchSubmit}
        />

        <h2>Список вакансий по профессии Frontend-разработчик</h2>
        {vacancies.map(v => (
          <VacancyItem key={v.id} vacancy={v} />
        ))}

        <Pagination
          total={totalPages}
          page={page}
          onChange={setPage}
        />
      </div>
    </div>
  );
}
