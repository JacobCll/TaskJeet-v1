import { useState } from "react";
import useCloseAndSaveTask from "../hooks/useCloseAndSaveTask";
// component to add new tasks
export default function TaskTemplate({
  taskId,
  setTaskId,
  groupId,
  addTaskEnabled,
  setAddTaskEnabled,
  taskGroups,
  setTaskGroups,
}) {
  const [taskNameText, setTaskNameText] = useState("");
  const [taskDescText, setTaskDescText] = useState("");

  const saveTaskAndClose = () => {
    if (taskDescText || taskNameText) {
      setTaskGroups(
        taskGroups.map((tg) => {
          if (tg.id === groupId) {
            return {
              ...tg,
              tasks: [
                {
                  id: taskId,
                  name: taskNameText,
                  description: taskDescText,
                  completed: false,
                },
                ...tg.tasks,
              ],
            };
          } else {
            return tg;
          }
        })
      );
      setTaskId(taskId + 1);
    }

    setAddTaskEnabled(false);
  };

  const taskTemplateRef = useCloseAndSaveTask(addTaskEnabled, saveTaskAndClose);

  return (
    <div className="editing-task" ref={taskTemplateRef}>
      <div className="editing-task-inputs">
        <input
          type="text"
          placeholder="Enter task name..."
          value={taskNameText}
          onChange={(e) => {
            setTaskNameText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveTaskAndClose();
          }}
        />

        <input
          type="text"
          placeholder="Enter task description..."
          value={taskDescText}
          onChange={(e) => {
            setTaskDescText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveTaskAndClose();
          }}
        />
      </div>
    </div>
  );
}
