import type { KeyboardEvent } from 'react';
import { useState } from 'react';

interface Props {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filters({ skills, setSkills, city, setCity }: Props) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills(prev => [...prev, newSkill]);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div style={{ width: '250px' }}>
      <div>
        <h4>Ключевые навыки</h4>
        {skills.map(skill => (
          <span key={skill} style={{ marginRight: '5px' }}>
            {skill}{' '}
            <button onClick={() => setSkills(prev => prev.filter(s => s !== skill))}>x</button>
          </span>
        ))}
        <input
          type="text"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Добавить навык"
        />
        <button onClick={addSkill}>+</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Город</h4>
        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="all">Все</option>
          <option value="1">Москва</option>
          <option value="2">Санкт-Петербург</option>
        </select>
      </div>
    </div>
  );
}
