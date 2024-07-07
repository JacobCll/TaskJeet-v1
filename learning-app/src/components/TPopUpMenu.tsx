import useCloseOnOutside from "../hooks/useCloseOnOutside";
export default function PopUpMenu({
  task,
  groupId,
  taskGroups,
  setTaskGroups,
  popUpMenu,
  setPopUpMenu,
}) {
  const handleDeleteTask = () => {
    setTaskGroups(
      taskGroups.map((tg) => {
        if (tg.id === groupId) {
          return {
            ...tg,
            tasks: tg.tasks.filter((t) => t.id !== task.id),
          };
        } else {
          return tg;
        }
      })
    );
  };

  const contextMenuRef = useCloseOnOutside(popUpMenu, setPopUpMenu);
  return (
    <div className="task-settings-content" ref={contextMenuRef}>
      <button className="delete-task-button" onClick={handleDeleteTask}>
        <span className="material-symbols-outlined">delete</span>Delete
      </button>
    </div>
  );
}
