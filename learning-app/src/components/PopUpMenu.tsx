import useCloseOnOutside from "../hooks/useCloseOnOutside";
export default function PopUpMenu({
  popUpMenu,
  setPopUpMenu,
  groupId,
  taskGroups,
  setTaskGroups,
}) {
  const popUpMenuRef = useCloseOnOutside(popUpMenu, setPopUpMenu);
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
