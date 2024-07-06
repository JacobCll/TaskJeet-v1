export default function Task({ task, taskGroups, setTaskGroups, groupId }) {
  const handleCheckbox = () => {
    setTaskGroups(
      taskGroups.map((tg) => {
        if (tg.id === groupId) {
          return {
            ...tg,
            tasks: tg.tasks.map((t) => {
              if (task.id === t.id) {
                return {
                  ...t,
                  completed: !t.completed,
                };
              } else {
                return t;
              }
            }),
          };
        } else {
          return tg;
        }
      })
    );
  };

  const handleDeleteTask = () => {
    setTaskGroups(
      taskGroups.map((tg) => {
        if (tg.id === groupId) {
          return {
            ...tg,
            tasks: tg.tasks.filter((t) => t.id !== task.id),
          };
        } else {
          return tg;
        }
      })
    );
  };

  return (
    <div className="task-container">
      <div className="task-content">
        <div className="task-checkbox-container">
          <input
            className="task-checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckbox}
          />
        </div>

        <div className="task-info">
          <h4>{task.name}</h4>
          <p>{task.description}</p>
        </div>

        <div className="task-delete-button">
          <button onClick={handleDeleteTask}>delete</button>
        </div>
      </div>
    </div>
  );
}
