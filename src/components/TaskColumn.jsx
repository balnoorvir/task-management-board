function TaskColumn({
  title,
  tasks,
  deleteTask,
  moveTask,
  editingTaskId,
  editText,
  setEditText,
  startEditing,
  saveTask,
}) {
  return (
    <div className="column">
      <h2>{title}</h2>

      {tasks.map((task) => (
        <div
  key={task.id}
  className={`task-card ${task.priority.toLowerCase()}-card`}
>
          {editingTaskId === task.id ? (
  <>
  <input
    type="text"
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
  />

  <button onClick={() => saveTask(task.id)}>
    Save
  </button>
</>
) : (
  <h3 onClick={() => startEditing(task)}>
    {task.title}
  </h3>
)}
         
          <button onClick={() => deleteTask(task.id)}>
    Delete
  </button>
  {task.status !== "Done" && (
  <button onClick={() => moveTask(task.id)}>
    Move
  </button>
)}
        </div>
      ))}
    </div>
  );
}

export default TaskColumn;