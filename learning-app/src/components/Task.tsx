import { useState, useCallback } from "react";

import TaskTemplate from "./TaskTemplate";
import PopUpMenu from "./TPopUpMenu";

// prop "task" is an object
export default function Task({ task, taskGroups, setTaskGroups, group }) {
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isFavorite = group.favorites.includes(task.id);

  console.log(group.tasks);
  // handle checking a task
  const handleCheckbox = useCallback(() => {
    setTaskGroups((prevTaskGroups) =>
      prevTaskGroups.map((tg) => {
        if (tg.id === group.id) {
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
  }, [group, setTaskGroups, task]);

  // handle adding task to favorites
  const handleAddToFavorites = useCallback(() => {
    setTaskGroups((prevTaskGroups) =>
      prevTaskGroups.map((tg) => {
        if (tg.id === group.id) {
          return {
            ...tg,
            favorites: tg.favorites.includes(task.id)
              ? tg.favorites.filter((id) => id !== task.id)
              : [...tg.favorites, task.id],
          };
        } else {
          return tg;
        }
      })
    );
  }, [group, setTaskGroups, task]);

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <TaskTemplate
          taskId={task.id}
          group={group}
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
              onChange={() => {
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
                  group={group}
                  taskGroups={taskGroups}
                  setTaskGroups={setTaskGroups}
                  popUpMenu={popUpMenu}
                  setPopUpMenu={setPopUpMenu}
                />
              )}
            </div>

            <div className="task-settings-button">
              <button
                className="task-settings-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToFavorites();
                }}
              >
                {isFavorite ? (
                  <span className="material-icons">star</span>
                ) : (
                  <span className="material-icons">star_border</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
