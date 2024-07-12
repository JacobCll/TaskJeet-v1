import { useState } from "react";

export default function MainMenu({
  selection,
  setSelection,
  taskGroups,
  setTaskGroups,
  groupId,
  setGroupId,
}) {
  const handleAddGroup = () => {
    setTaskGroups([
      ...taskGroups,
      {
        name: "",
        id: groupId,
        tasks: [],
      },
    ]);
    setGroupId(groupId + 1);
  };
  return (
    <div className="main-menu">
      <button className="create-list-button" onClick={handleAddGroup}>
        <span className="material-icons">add</span>Create
      </button>

      <div className="task-selections">
        <button
          className={
            selection === "all-tasks"
              ? "button-selection selected"
              : "button-selection"
          }
          onClick={() => setSelection("all-tasks")}
        >
          <span className="material-icons">task_alt</span>All Tasks
        </button>
        <button
          className={
            selection === "favorites"
              ? "button-selection selected"
              : "button-selection"
          }
          onClick={() => setSelection("favorites")}
        >
          <span className="material-icons">star_border</span>Favorites
        </button>
      </div>

      <div className="lists-markdown">
        <div className="lists-markdown-button">
          <div>Lists</div>
          <button>
            <span className="material-icons">expand_more</span>
          </button>
        </div>
        <ul className="lists-container">
          {taskGroups.map((tg) => {
            return (
              <li className="list-item">
                <div className="list-item-checkbox">
                  <input type="checkbox" />
                  <label></label>
                </div>
                {tg.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
