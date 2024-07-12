import useCloseOnOutside from "../hooks/useCloseOnOutside";
export default function PopUpMenu({
  showedListIds,
  setShowedListIds,
  popUpMenu,
  setPopUpMenu,
  group,
  taskGroups,
  setTaskGroups,
}) {
  const popUpMenuRef = useCloseOnOutside(popUpMenu, setPopUpMenu);
  const handleDeleteList = () => {
    setTaskGroups(taskGroups.filter((tg) => tg.id !== group.id));
    setShowedListIds(showedListIds.filter((id) => id !== group.id));
  };
  return (
    <div className="list-context-content" ref={popUpMenuRef}>
      <ul>
        <li onClick={handleDeleteList}>
          <span>Delete list</span>
        </li>
      </ul>
    </div>
  );
}
