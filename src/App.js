import { useEffect, useState } from "react";
import AppInput from "./components/AppInput";
import EditInput from "./components/EditInput";
import Lists from "./components/Lists";

function App() {
  //APP HOOKS
  //STATES
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("data");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [allTask, setAllTask] = useState(true);
  const [completeTask, setCompleteTask] = useState(false);
  const [comp, setComp] = useState([]);
  const [activeTask, setActiveTask] = useState(false);
  const [act, setAct] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});

  //EFFECTS
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);
  //NEW FEATURES
  const handleEditChange = (e) => {
    setCurrentEdit({ ...currentEdit, title: e.target.value });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleUpdateEdit(currentEdit.id, currentEdit);
  };

  const handleUpdateEdit = (id, update) => {
    const updateTodo = todos.map((item) => {
      return item.id === id ? update : item;
    });
    setIsEditing(false);
    setTodos(updateTodo);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentEdit({ ...todo });
    console.log({ ...todo });
  };
  //  APP FUNCTIONS
  const randNum = () => {
    return Math.floor(Math.random() * 999999999999);
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input === "" || input == null) return;
    setTodos([...todos, { id: randNum(), title: input, isCompleted: false }]);
    setInput("");
  };
  const handleDelete = ({ id }) => {
    const newArr = todos.filter((item) => item.id !== id);
    setTodos(newArr);
  };
  const handleComplete = ({ id }) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      })
    );
  };
  const allTaskFn = () => {
    setAllTask(true);
    setCompleteTask(false);
    setActiveTask(false);
    setTodos(todos);
  };
  const completeFn = () => {
    setAllTask(false);
    setCompleteTask(true);
    setActiveTask(false);
    const complete = allDone();
    setComp(complete);
  };
  const activeFn = () => {
    setAllTask(false);
    setCompleteTask(false);
    setActiveTask(true);
    const active = notDone();
    setAct(active);
  };

  const allDone = () => {
    return todos.filter((item) => item.isCompleted === true);
  };
  const notDone = () => {
    return todos.filter((item) => item.isCompleted === false);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        {isEditing ? (
          <EditInput
            handleEditChange={handleEditChange}
            handleEditSubmit={handleEditSubmit}
            currentEdit={currentEdit}
            handleCancel={handleCancel}
          />
        ) : (
          <AppInput
            input={input}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
        <div className="btn-wrapper">
          <button className="btn" onClick={allTaskFn}>
            All
          </button>
          <button className="btn" onClick={activeFn}>
            Active
          </button>
          <button className="btn" onClick={completeFn}>
            Completed
          </button>
        </div>
        <div className="list">
          {allTask ? (
            <Lists
              todos={todos}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handleEditClick={handleEditClick}
            />
          ) : null}
          {completeTask ? (
            <Lists
              todos={comp}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
            />
          ) : null}
          {activeTask ? (
            <Lists
              todos={act}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
