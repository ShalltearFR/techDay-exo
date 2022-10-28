import './App.css';
import TasksList from './Components/TasksList';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "http://localhost:5000/api"

  return (
    <div className="App">
      <TasksList/>
    </div>
  );
}

export default App;
