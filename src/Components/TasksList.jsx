import { useEffect, useState } from "react"
import axios from "axios"

export default function Tasks(){
    const [tasks, setTasks] = useState("loading")
    const [inputTask, setInputTask] = useState("")
    const [checkBoxTask, setCheckBoxTask] = useState(false)

    useEffect(()=>{ // Recuperation de la liste de taches au chargement de la page
        axios.get("/tasks")
        .then(response => setTasks(response.data))
        .catch(err => console.log(err))
    }, [])

    if (tasks === "loading"){ return (<div>Loading...</div>)}

    function addTask(){ // Ajout d'une tache
        axios.post("/tasks", {title: inputTask, doneyet: checkBoxTask})
        .then(() => axios.get("/tasks")
            .then(response => setTasks(response.data))
            .catch(err => console.log(err)))
        .catch(err => console.log(err))
    }

    function updateDoneYet(task){ // Mise à jour de la completion
        axios.put(`/tasks/${task._id}`, {doneyet: !task.doneyet})
        .then(()=> axios.get("/tasks")
            .then(response => setTasks(response.data))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    }

    function deleteTask(_id){
        axios.delete(`/tasks/${_id}`)
        .then(()=> axios.get("/tasks")
            .then(response => setTasks(response.data))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    }

    return(
        <div className="tasksList">
        <h1>List of tasks</h1>
            {
                tasks.length === 0
                ? <h3 className="emptyList">Your list is empty</h3>
                : <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Task Description</th>
                                <th>Done ?</th>
                                <th>Delete ?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task) =>(
                                    <tr className="task" key={task._id}>
                                        <td>{task.title}</td>
                                        {
                                            task.doneyet
                                            ? <td onClick={()=> updateDoneYet(task)}>✅</td>
                                            : <td onClick={()=> updateDoneYet(task)}>✔️</td>
                                        }
                                        <td onClick={()=> deleteTask(task._id)}>❌</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
            <div className="taskChange">
                <input type="text" className="inputText" value={inputTask} onChange={e => setInputTask(e.target.value)} placeholder="Task description" />
                <div>
                    <label>
                        Task complete ? 
                        <input type="checkbox" className="checkBox" value={checkBoxTask} onChange={e => setCheckBoxTask(e.target.checked)}/>
                    </label>
                    <button onClick={addTask}>Add task</button>
                </div>
            </div>
        </div>
    )
}