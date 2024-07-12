import { useState } from "react";

export default function MainMenu({
  showedListIds,
  setShowedListIds,
  selection,
  setSelection,
  taskGroups,
  setTaskGroups,
  groupId,
  setGroupId,
}) {
  // show lists markdown on click
  const [listsMdShown, setListsMdShown] = useState(true);

  const handleAddGroup = () => {
    setTaskGroups([
      ...taskGroups,
      {
        name: "",
        id: groupId,
        tasks: [],
        favorites: [],
      },
    ]);
    setGroupId(groupId + 1);
  };

  return (
    <div className="main-menu">
      <button className="create-task-button">
        <span className="material-icons">add</span>Create
      </button>

      <div className="task-selections">
        <button
          className={
            selection === "all-tasks"
              ? "button-selection selected"
              : "button-selection"
          }
          onClick={() => setSelection("all-tasks")}
        >
          <span className="material-icons">task_alt</span>All Tasks
        </button>
        <button
          className={
            selection === "favorites"
              ? "button-selection selected"
              : "button-selection"
          }
          onClick={() => setSelection("favorites")}
        >
          <span className="material-icons">star_border</span>Favorites
        </button>
      </div>

      <div className="lists-markdown">
        <div
          className="lists-markdown-button"
          onClick={() => setListsMdShown(!listsMdShown)}
        >
          <div>Lists</div>
          <button>
            {listsMdShown ? (
              <span className="material-icons">expand_less</span>
            ) : (
              <span className="material-icons">expand_more</span>
            )}
          </button>
        </div>
        {listsMdShown && (
          <div className="lists-container-overflow">
            <ul className="lists-container">
              {taskGroups.map((tg) => {
                return (
                  <li key={tg.id} className="list-item">
                    <input
                      className="list-item-checkbox"
                      type="checkbox"
                      checked={showedListIds.includes(tg.id)}
                      onChange={() =>
                        showedListIds.includes(tg.id)
                          ? setShowedListIds(
                              showedListIds.filter((id) => id !== tg.id)
                            )
                          : setShowedListIds([...showedListIds, tg.id])
                      }
                    />
                    {tg.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <button
          className="add-list-button"
          onClick={() => {
            setShowedListIds([...showedListIds, groupId]);
            handleAddGroup();
          }}
        >
          <span className="material-icons">add</span>Create new list
        </button>
      </div>
    </div>
  );
}
