import type { KeyboardEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  city: string;
}

export default function Filters({ skills, setSkills, city }: Props) {
  const [newSkill, setNewSkill] = useState("");
  const navigate = useNavigate();

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
      setNewSkill("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleCityChange = (newCity: string) => {
    navigate(`/vacancies/${newCity}`);
  };

  return (
    <div style={{ width: "250px" }}>
      <div>
        <h4>Ключевые навыки</h4>
        {skills.map((skill) => (
          <span key={skill} style={{ marginRight: "5px" }}>
            {skill}{" "}
            <button onClick={() => setSkills((prev) => prev.filter((s) => s !== skill))}>
              x
            </button>
          </span>
        ))}
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Добавить навык"
        />
        <button onClick={addSkill}>+</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Город</h4>
        <div>
          <button
            style={{ fontWeight: city === "moscow" ? "bold" : "normal", marginRight: "5px" }}
            onClick={() => handleCityChange("moscow")}
          >
            Москва
          </button>
          <button
            style={{ fontWeight: city === "petersburg" ? "bold" : "normal" }}
            onClick={() => handleCityChange("petersburg")}
          >
            Санкт-Петербург
          </button>
        </div>
      </div>
    </div>
  );
}
