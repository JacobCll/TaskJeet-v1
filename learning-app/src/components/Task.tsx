import { useState } from "react";

import TaskTemplate from "./TaskTemplate";
import PopUpMenu from "./TPopUpMenu";

export default function Task({ task, taskGroups, setTaskGroups, groupId }) {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <TaskTemplate
          taskId={task.id}
          groupId={groupId}
          taskGroups={taskGroups}
          setTaskGroups={setTaskGroups}
          taskName={task.name}
          taskDesc={task.description}
          taskCompleted={task.completed}
          taskTemplateEnabler={isEditing}
          setTaskTemplateEnabler={setIsEditing}
        />
      ) : (
        <div className="task-container">
          <div className="task-checkbox-container">
            <input
              className="task-checkbox"
              id={`checkbox-${task.id}`}
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                handleCheckbox();
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <label
              onClick={(e) => e.stopPropagation()}
              htmlFor={`checkbox-${task.id}`}
            ></label>
          </div>

          <div className="task-info">
            <h4>{task.name}</h4>
            <p>{task.description}</p>
          </div>

          <div className="task-settings-container">
            <div className="task-settings-button">
              <button
                onClick={(e) => {
                  setPopUpMenu(true);
                  e.stopPropagation();
                }}
              >
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
      )}
    </div>
  );
}
