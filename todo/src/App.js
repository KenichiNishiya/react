import './App.css';
import {useState} from 'react';

function App() {
    const [todoList,setTodoList] = useState([]);
    const [newTask,setNewTask] = useState("");

    const handleChange = (event) =>{
        setNewTask(event.target.value);
    }

    const addTask = () =>{
        // We are creating an object named task, with the id and task name, to be added
        // to our todoList array
        const task = {
            /*To create a new id for this task object, we get the last id created with
                the [todoList.length - 1].id since in an array with 3 things we have the
                ids (0,1,2). And then we are have +1 to enter the new id (in this case, 3)
                AND we need to initialize the id somewhere, so if there is nothing in the
                array, then the id is set to 1, else execute above explained*/
            id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1 ,
            taskName: newTask,
            // newTask is the state which value is grabbed from the input
            completed: false,
        };
        // In order to add new values to the todoList array, we need to create another array
        // which receives all the values from the todoList + the new value we want to add
        // this new array is indicated with the [] surrounding both variables
        // the spread operator (...) is used to copy all the values from an array
        setTodoList([...todoList,task]);
    }

    const deleteTask = (id) =>{
        {/*const newTodoList = todoList.filter((task) =>{
            if(task.id === id){
                return false;
            }
            else{
                return true;
            }
        })*/}

        // The code above is the same as the code inside the setTodoList function
        // it uses the filter function to loop through every task (object), and if the task
        // has the same id as the id passed as a parameter, then it returns false (don't
        // include it on the array), else it's true
       
        setTodoList(todoList.filter((task) => task.id !== id));
        // return task.id !== id
        // the code above means to return task if the task.id is different than id
    }

    const toggleComplete = (id) =>{
        setTodoList(todoList.map((task) =>{
            if(task.id === id){
                // the task object remains the same, except that its completed field is
                // set to true
                if(task.completed){
                    return {...task,completed: false};
                }
                else{
                    return {...task,completed: true};
                }
            }
            else{
                return task;
            }
        }))
    }

  return (
    <div className="App">

      <div className="addTask">
          <input onChange={handleChange}/>
          <button onClick={addTask}>Add Task</button>
      </div>

      <div className="list">
          {/*Uses the map method to show everything inside the array, passing the task value
              as a parameter and displaying it*/}
          {todoList.map((task) => {
              return <Task taskName={task.taskName} id={task.id} completed={task.completed} deleteTask={deleteTask} toggleComplete={toggleComplete}/>
          })}
      </div>
    </div>
  );
}

const Task = (props) => {
    return (
        <div>
            <h1 style={{color: props.completed ? "green" : "black"}}>{props.taskName}</h1>
            {/*Whenever there's a parameter beign sent to the function on a button'
               onClick, we need to make a arrow function which calls the deleteTask
               function*/}
            <button onClick={() => props.toggleComplete(props.id)}> Complete </button>
            <button onClick={() => props.deleteTask(props.id)}> X </button>
            {/*The deleteTask function can't be acessed as normal, so we need to pass
                it as a props*/}
        </div>
    );
}
export default App;
