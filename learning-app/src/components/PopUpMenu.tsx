export default function PopUpMenu({
  popUpMenuRef,
  groupId,
  taskGroups,
  setTaskGroups,
}) {
  const handleDeleteList = () => {
    setTaskGroups(taskGroups.filter((tg) => tg.id !== groupId));
  };
  return (
    <div className="list-context-content" ref={popUpMenuRef}>
      <ul>
        <li onClick={handleDeleteList}>
          <span>Delete List</span>
        </li>
      </ul>
    </div>
  );
}
