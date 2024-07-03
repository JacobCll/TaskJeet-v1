import { useState } from "react";
import Task from "../components/Task";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea";

let taskId = 0;

export default function TaskList({ taskGroups, setTaskGroups, groupId }) {
  let [addTaskEnabled, setAddTaskEnabled] = useState(false);
  let [value, setValue] = useState("");
  const textareaRef = useAutoResizeTextarea(value);

  const currentTaskGroup = taskGroups.find((group) => group.id === groupId);

  console.log(taskGroups);

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
  return (
    <>
      <textarea
        placeholder="List title..."
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
      <hr />

      {addTaskEnabled ? (
        <TaskTemplate
          setAddTaskEnabled={setAddTaskEnabled}
          groupId={groupId}
          taskGroups={taskGroups}
          setTaskGroups={setTaskGroups}
        />
      ) : (
        <button
          className="add-task-button"
          onClick={() => setAddTaskEnabled(!addTaskEnabled)}
        >
          Add Task
        </button>
      )}

      <ul className="task-list">
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
    </>
  );
}

// component to add new tasks
const TaskTemplate = ({
  groupId,
  setAddTaskEnabled,
  taskGroups,
  setTaskGroups,
}) => {
  let [taskNameText, setTaskNameText] = useState("");
  let [taskDescText, setTaskDescText] = useState("");

  const saveTask = () => {
    setTaskGroups(
      taskGroups.map((tg) => {
        if (tg.id === groupId) {
          return {
            ...tg,
            tasks: [
              ...tg.tasks,
              {
                id: taskId++,
                name: taskNameText,
                description: taskDescText,
                completed: false,
              },
            ],
          };
        } else {
          return tg;
        }
      })
    );
    setAddTaskEnabled(false);
  };

  return (
    <div className="editing-task">
      <div className="editing-task-inputs">
        <input
          type="text"
          placeholder="Enter task name..."
          value={taskNameText}
          onChange={(e) => {
            setTaskNameText(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Enter task description..."
          value={taskDescText}
          onChange={(e) => {
            setTaskDescText(e.target.value);
          }}
        />
      </div>

      <div className="editing-task-buttons">
        <button onClick={saveTask}>Save</button>
        <button onClick={() => setAddTaskEnabled(false)}>Cancel</button>
      </div>
    </div>
  );
};
