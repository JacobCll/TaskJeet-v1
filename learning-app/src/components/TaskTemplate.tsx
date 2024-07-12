import { useState } from "react";

import useCloseAndSaveTask from "../hooks/useCloseAndSaveTask";
import useAutoResizeTextarea from "../hooks/useAutoResizeTextarea";
import useFocus from "../hooks/useFocusOnInput";
import useMergeRefs from "../hooks/useMergeRefs";

// component to add new tasks
export default function TaskTemplate({
  taskId,
  setTaskId = null,
  groupId,
  taskTemplateEnabler = false,
  setTaskTemplateEnabler = null,
  taskGroups,
  setTaskGroups,
  taskName = "",
  taskDesc = "",
  taskCompleted = false,
}) {
  const [taskNameText, setTaskNameText] = useState(taskName);
  const [taskDescText, setTaskDescText] = useState(taskDesc);

  const taskNameRef = useAutoResizeTextarea(taskNameText);
  const taskDescRef = useAutoResizeTextarea(taskDescText);
  const textareaRef = useFocus();

  // merge multiple refs hook
  const taskNameMergeRefs = useMergeRefs(taskNameRef, textareaRef);

  const saveTaskAndClose = () => {
    // check if there is text in both inputs
    if (taskDescText || taskNameText) {
      setTaskGroups(
        taskGroups.map((tg) => {
          if (tg.id === groupId) {
            const taskExists = tg.tasks.some((task) => task.id === taskId);
            if (taskExists) {
              return {
                ...tg,
                tasks: tg.tasks.map((task) => {
                  if (task.id === taskId) {
                    return {
                      ...task,
                      name: taskNameText,
                      description: taskDescText,
                      completed: taskCompleted,
                    };
                  } else {
                    return task;
                  }
                }),
              };
            } else {
              setTaskId(taskId + 1);
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
            }
          } else {
            return tg;
          }
        })
      );
      //if there is none delete the task
    } else {
      setTaskGroups(
        taskGroups.map((tg) => {
          if (tg.id === groupId) {
            return {
              ...tg,
              tasks: tg.tasks.filter((t) => t.id !== taskId),
            };
          } else {
            return tg;
          }
        })
      );
    }

    setTaskTemplateEnabler(false);
  };

  const taskTemplateRef = useCloseAndSaveTask(
    taskTemplateEnabler,
    saveTaskAndClose
  );

  return (
    <div className="editing-task" ref={taskTemplateRef}>
      <div className="task-checkbox-container">
        <input
          className="task-checkbox"
          id={`editing-checkbox`}
          type="checkbox"
        />
        <label htmlFor={`editing-checkbox`}></label>
      </div>
      <div className="editing-task-inputs">
        <textarea
          rows={1}
          className="task-name-textarea"
          ref={taskNameMergeRefs}
          placeholder="Title"
          value={taskNameText}
          onChange={(e) => {
            setTaskNameText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveTaskAndClose();
          }}
        />

        <textarea
          rows={1}
          className="task-desc-textarea"
          ref={taskDescRef}
          placeholder="Details"
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
