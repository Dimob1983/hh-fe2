import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import VacanciesList from "./components/VacanciesList";
import VacancyPage from './components/VacancyPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <Routes>
          <Route path="/vacancies" element={<VacanciesList />} />
          <Route path="/vacancies/:id" element={<VacancyPage />} />
          <Route path="*" element={<VacanciesList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
