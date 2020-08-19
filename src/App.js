import React from "react";
import api from 'services/api.js'
import "./styles.css";
import { useState ,useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([])
  const [cont, setCont]=useState(1);
  useEffect(()=>{
    api.get('repositories').then(response=>{
        setRepositories(response.data)
    })
    
  },[])


  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      title:`Repositório ${cont}`,
      urtl:"url",
      techs:"techs"
    }
    
    
    
    );
    const repository = response.data;
    setRepositories([...repositories,repository]);
    setCont(cont+1)
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    const response = await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter((repository) => repository.id !== id);
    setRepositories(newRepositories);
    
  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository=>(<li key={repository.id}>{repository.title}
          <button onClick={()=>handleRemoveRepository(repository.id)}>
            Remover
          </button>
        
        </li>))}
        
      
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
