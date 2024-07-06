import { useEffect, useState } from "react";
import Task from "../components/Task";
import TaskTemplate from "./TaskTemplate";
import PopUpMenu from "./PopUpMenu";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea";

export default function TaskList({ taskGroups, setTaskGroups, groupId }) {
  const [addTaskEnabled, setAddTaskEnabled] = useState(false);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [value, setValue] = useState("");
  const [taskId, setTaskId] = useState(0);

  const textareaRef = useAutoResizeTextarea(value);

  const currentTaskGroup = taskGroups.find((group) => group.id === groupId);

  useEffect(() => {
    if (currentTaskGroup) {
      setValue(currentTaskGroup.name);
    }
  }, [currentTaskGroup]);

  const handleOnChangeListTitle = (e) => {
    setTaskGroups(
      taskGroups.map((tg) => {
        if (tg.id === groupId) {
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

  console.log(taskGroups);
  return (
    <div className="tasks-list-container">
      <div className="list-heading">
        <textarea
          placeholder="TITLE"
          className="task-list-title"
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            handleOnChangeListTitle(e);
          }}
          style={{
            overflow: "hidden",
            resize: "none",
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
              popUpMenu={popUpMenu}
              setPopUpMenu={setPopUpMenu}
              groupId={groupId}
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
            addTaskEnabled={addTaskEnabled}
            setAddTaskEnabled={setAddTaskEnabled}
            taskId={taskId}
            setTaskId={setTaskId}
            groupId={groupId}
            taskGroups={taskGroups}
            setTaskGroups={setTaskGroups}
          />
        )}

        {currentTaskGroup.tasks.map((task) => (
          <li key={task.id}>
            <Task
              groupId={groupId}
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
