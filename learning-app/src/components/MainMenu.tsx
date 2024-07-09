export default function MainMenu({
  taskGroups,
  setTaskGroups,
  groupId,
  setGroupId,
}) {
  const handleAddGroup = () => {
    setTaskGroups([
      ...taskGroups,
      {
        name: "",
        id: groupId,
        tasks: [],
      },
    ]);
    setGroupId(groupId + 1);
  };
  return (
    <div className="main-menu">
      <button className="create-list-button" onClick={handleAddGroup}>
        <span className="material-icons">add</span>Create
      </button>
    </div>
  );
}
