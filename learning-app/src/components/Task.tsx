import { useState } from "react";
import PopUpMenu from "./TPopUpMenu";

export default function Task({ task, taskGroups, setTaskGroups, groupId }) {
  const [popUpMenu, setPopUpMenu] = useState(false);

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

  return (
    <div className="task-container">
      <div className="task-checkbox-container">
        <input
          className="task-checkbox"
          id={`checkbox-${task.id}`}
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckbox}
        />
        <label htmlFor={`checkbox-${task.id}`}></label>
      </div>

      <div className="task-info">
        <h4>{task.name}</h4>
        <p>{task.description}</p>
      </div>

      <div className="task-settings-container">
        <div className="task-settings-button">
          <button onClick={() => setPopUpMenu(true)}>
            <span className="material-icons">more_vert</span>
          </button>

          {popUpMenu && (
            <PopUpMenu
              task={task}
              groupId={groupId}
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
              popUpMenu={popUpMenu}
              setPopUpMenu={setPopUpMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}
