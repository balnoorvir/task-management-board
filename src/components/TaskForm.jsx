function TaskForm({
  taskTitle,
  setTaskTitle,
  priority,
  setPriority,
  addTask,
}) {
  return (
   <form className="task-form">
  <div className="form-group">
   <label>Task Title</label>
    <input
      type="text"
      placeholder="Enter a new task..."
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label>Priority</label>
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option>High</option>
      <option>Medium</option>
      <option>Low</option>
    </select>
  </div>

  <button type="button" onClick={addTask}>
    Add Task
  </button>
</form>
  );
}

export default TaskForm;