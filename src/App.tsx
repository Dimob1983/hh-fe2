import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import NotFound from './components/NotFound';
import VacanciesList from "./components/VacanciesList";
import VacancyPage from './components/VacancyPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <Routes>
          <Route path="/vacancies/:city" element={<VacanciesList />} />
          <Route path="/vacancies/:city/:id" element={<VacancyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
