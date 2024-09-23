import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const animals = ['cat', 'dog', 'cow', 'deer'];
  const [checked, setChecked] = useState({});
  
  const storedChecked = localStorage.getItem('checked');
  useEffect(() => {
    if (storedChecked) {
      setChecked(JSON.parse(storedChecked));
    } else {
      setChecked(animals.reduce((acc, animal) => ({ ...acc, [animal]: false }), {}));
    }
  }, []); 

  useEffect(() => {
    localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]); 

  const handleSelectAll = () => {
    setChecked(animals.reduce((acc, animal) => ({ ...acc, [animal]: true }), {}));
  };

  const handleCheckboxChange = (name) => {
    setChecked((prevChecked) => ({ ...prevChecked, [name]: !prevChecked[name] }));
  };

  return (
    <div>
      <h1>Checkboxes</h1>
      <button onClick={handleSelectAll}>Select all</button>
      <ul>
        {animals.map((animal) => (
          <li key={animal}>
            <input
              type="checkbox"
              name={animal}
              checked={checked[animal]}
              onChange={() => handleCheckboxChange(animal)}
            />
            <label>{animal}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
