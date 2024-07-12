import { useState } from "react";

import Task from "../components/Task";
import TaskTemplate from "./TaskTemplate";
import PopUpMenu from "./TLPopUpMenu";

import useMergeRefs from "../hooks/useMergeRefs";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea";

export default function TaskList({
  taskId,
  setTaskId,
  showedListIds,
  setShowedListIds,
  taskGroups,
  setTaskGroups,
  group,
}) {
  const [addTaskEnabled, setAddTaskEnabled] = useState(false);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [value, setValue] = useState("");

  const textareaRef = useAutoResizeTextarea(value);
  const titleTextRef = useMergeRefs(textareaRef);

  const handleOnChangeListTitle = (e) => {
    setTaskGroups(
      taskGroups.map((tg) => {
        if (tg.id === group.id) {
          return {
            ...tg,
            name: e.target.value,
          };
        } else {
          return tg;
        }
      })
    );
    setValue(e.target.value);
  };

  return (
    <div className="tasks-list-container">
      <div className="list-heading">
        <textarea
          placeholder="TITLE"
          className="task-list-title"
          ref={titleTextRef}
          value={group.name}
          onChange={(e) => {
            handleOnChangeListTitle(e);
          }}
          rows={1}
        />
        <div className="list-context">
          <button
            className="list-context-button"
            onClick={() => setPopUpMenu(true)}
          >
            <span className="material-icons">more_vert</span>
          </button>

          {popUpMenu && (
            <PopUpMenu
              showedListIds={showedListIds}
              setShowedListIds={setShowedListIds}
              popUpMenu={popUpMenu}
              setPopUpMenu={setPopUpMenu}
              group={group}
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
            />
          )}
        </div>
      </div>

      <hr />

      <button
        className="add-task-button"
        onClick={() => setAddTaskEnabled(!addTaskEnabled)}
      >
        <span className="add-task-icon material-symbols-outlined">
          add_circle
        </span>
        Add a task
      </button>

      <ul className="task-list">
        {addTaskEnabled && (
          <TaskTemplate
            taskTemplateEnabler={addTaskEnabled}
            setTaskTemplateEnabler={setAddTaskEnabled}
            taskId={taskId}
            setTaskId={setTaskId}
            group={group}
            taskGroups={taskGroups}
            setTaskGroups={setTaskGroups}
          />
        )}

        {group.tasks.map((task) => (
          <li key={task.id}>
            <Task
              group={group}
              task={task}
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
