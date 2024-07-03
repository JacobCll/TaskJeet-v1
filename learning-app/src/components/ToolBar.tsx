export default function ToolBar({
  taskGroups,
  setTaskGroups,
  searchText,
  setSearchText,
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
    <div className="toolbar">
      <button onClick={handleAddGroup}>Add Task Group</button>
      <div className="search-container">
        <input
          className="search-field"
          placeholder="Search task..."
          value={searchText}
          onChange={(e: any) => {
            setSearchText(e.value.target);
          }}
        />

        <button className="search-button">Search</button>
      </div>
    </div>
  );
}
