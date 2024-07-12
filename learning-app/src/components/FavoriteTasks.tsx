import Task from "./Task";

export default function FavoriteTasks({ taskGroups, setTaskGroups }) {
  return (
    <div className="tasks-list-container favorites">
      <div className="list-heading">Favorite Tasks</div>
      <hr />
      {/* <button className="add-task-button">
        <span className="add-task-icon material-symbols-outlined">
          add_circle
        </span>
        Add a starred task
      </button> */}
      <ul className="task-list">
        {taskGroups
          .filter((tg) => tg.favorites.length > 0)
          .map((tg) =>
            tg.tasks.map((t) => {
              if (tg.favorites.includes(t.id)) {
                return (
                  <Task
                    group={tg}
                    task={t}
                    taskGroups={taskGroups}
                    setTaskGroups={setTaskGroups}
                  />
                );
              }
            })
          )}
      </ul>
    </div>
  );
}
