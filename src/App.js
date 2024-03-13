import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [fact, setFact] = useState('');
  const [age, setAge] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const lastRequestedName = useRef('');

  const getFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact')
      const data = await response.json()
      setFact(data.fact);
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const getAge = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.agify.io?name=${name}`);
      const data = await response.json();
      setAge(data.age);
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let timer
    if (name && name !== lastRequestedName.current && !loading) {
      lastRequestedName.current = name;
      timer = setTimeout(getAge, 3000);
    }
      return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, loading])

  const handleSubmit = (e) => {
    e.preventDefault();
    setAge(null);
    if (name && name !== lastRequestedName.current) {
      lastRequestedName.current = name
    }
    getAge();
  }

  return (
    <div className="page">
      <div className='first-task' style={{'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center'}}>
        <textarea 
          type='text'
          value={fact}
          readOnly
          onClick={(e) => e.target.setSelectionRange(fact.indexOf(' ') + 1, fact.length)}
          style={{'width':'50vw', 'height': '15vh', 'resize': 'none'}}/>
        <button type='submit' onClick={getFact} style={{'width':'15vw', 'marginTop': '3vh'}}>Факты</button>
      </div>
      <div className='second-task' style={{'marginTop': '10vh'}}>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Введите имя' onChange={(e) => setName(e.target.value)} value={name} style={{'width': '20vw'}}/>
          <button type='submit'>Отправить</button>
        </form>
        {age !== null && <p style={{position: 'absolute'}}>Возраст: {age}</p>}
      </div>
    </div>
  );
}

export default App;
