import { useEffect, useState } from "react";
import Task from "../components/Task";
import TaskTemplate from "./TaskTemplate";
import PopUpMenu from "./PopUpMenu";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea";
import useCloseOnOutside from "../hooks/useCloseOnOutside";

export default function TaskList({ taskGroups, setTaskGroups, groupId }) {
  const [addTaskEnabled, setAddTaskEnabled] = useState(false);
  const [popUpMenu, setPopUpMenu] = useState(false);
  const [value, setValue] = useState("");
  const [taskId, setTaskId] = useState(0);

  const textareaRef = useAutoResizeTextarea(value);
  const popUpMenuRef = useCloseOnOutside(popUpMenu, setPopUpMenu);

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

  console.log(taskId);
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
          <span
            className="list-context-button material-icons"
            onClick={() => setPopUpMenu(true)}
          >
            more_vert
          </span>

          {popUpMenu && (
            <PopUpMenu
              popUpMenuRef={popUpMenuRef}
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
        <span className="material-symbols-outlined">add_circle</span>
        Add Task
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
