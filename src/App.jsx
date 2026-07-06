import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import "./App.css";

function App() {
 const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
 const [taskTitle, setTaskTitle] = useState("");
const [priority, setPriority] = useState("Medium");
const [editingTaskId, setEditingTaskId] = useState(null);
const [editText, setEditText] = useState("");

function addTask() {
  if (taskTitle.trim() === "") return;

  const newTask = {
    id: Date.now(),
    title: taskTitle,
    priority: priority,
    status: "To Do",
  };

  setTasks([...tasks, newTask]);

  setTaskTitle("");
  setPriority("Medium");
}


function deleteTask(id) {
  setTasks(tasks.filter((task) => task.id !== id));
}

function moveTask(id) {
  setTasks(
    tasks.map((task) => {
      if (task.id !== id) return task;

      if (task.status === "To Do") {
        return { ...task, status: "In Progress" };
      }

      if (task.status === "In Progress") {
        return { ...task, status: "Done" };
      }

      return task;
    })
  );
}

function startEditing(task) {
  setEditingTaskId(task.id);
  setEditText(task.title);
}

function saveTask(id) {
  setTasks(
    tasks.map((task) =>
      task.id === id
        ? { ...task, title: editText }
        : task
    )
  );

  setEditingTaskId(null);
  setEditText("");
}

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  return (
    <div className="app">
      <Header
  title="Task Management Board"
  subtitle="Organize your tasks efficiently"
/>
   <TaskForm
  taskTitle={taskTitle}
  setTaskTitle={setTaskTitle}
  priority={priority}
  setPriority={setPriority}
  addTask={addTask}
/>
<div className="board">
 <TaskColumn
  title="To Do"
  tasks={tasks.filter((task) => task.status === "To Do")}
  deleteTask={deleteTask}
   moveTask={moveTask}
   editingTaskId={editingTaskId}
  editText={editText}
  setEditText={setEditText}
  startEditing={startEditing}
  saveTask={saveTask}
/>

  <TaskColumn
    title="In Progress"
    tasks={tasks.filter((task) => task.status === "In Progress")}
     deleteTask={deleteTask}
  moveTask={moveTask}
  editingTaskId={editingTaskId}
  editText={editText}
  setEditText={setEditText}
  startEditing={startEditing}
  saveTask={saveTask}
  />

  <TaskColumn
    title="Done"
    tasks={tasks.filter((task) => task.status === "Done")}
     deleteTask={deleteTask}
    moveTask={moveTask}
    editingTaskId={editingTaskId}
  editText={editText}
  setEditText={setEditText}
  startEditing={startEditing}
  saveTask={saveTask}
  />
</div>
      
    </div>
  );
}

export default App;