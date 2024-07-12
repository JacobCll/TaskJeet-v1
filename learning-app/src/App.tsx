import { useState } from "react";
import "./App.css";

import TaskList from "./components/TaskList";
import Header from "./components/Header";
import MainMenu from "./components/MainMenu";
import FavoriteTasks from "./components/FavoriteTasks";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function TodoApp() {
  const [groupId, setGroupId] = useState(0);
  const [taskId, setTaskId] = useState(0);

  const [mainMenu, setMainMenu] = useState(true);

  const [taskGroups, setTaskGroups] = useState([]);

  const [showedListIds, setShowedListIds] = useState([]);

  const [selection, setSelection] = useState("favorites");

  let breakPoints;
  // dynamic masonry
  switch (showedListIds.length) {
    case 1:
      breakPoints = { 900: 1 };
      break;
    case 2:
      breakPoints = { 900: 2, 750: 1 };
      break;
    case 3:
      breakPoints = { 900: 3, 750: 2, 600: 1 };
      break;
    default:
      breakPoints = { 350: 1, 800: 2, 900: 3, 1080: 4 };
  }

  if (selection === "favorites") {
    breakPoints = { 900: 1 };
  }

  return (
    <div className="app-container">
      <Header mainMenu={mainMenu} setMainMenu={setMainMenu} />
      <div className="app-body">
        {mainMenu && (
          <MainMenu
            showedListIds={showedListIds}
            setShowedListIds={setShowedListIds}
            selection={selection}
            setSelection={setSelection}
            taskGroups={taskGroups}
            setTaskGroups={setTaskGroups}
            groupId={groupId}
            setGroupId={setGroupId}
          />
        )}
        <div className="main-container">
          {selection === "all-tasks" ? (
            <TaskGroups
              taskId={taskId}
              setTaskId={setTaskId}
              showedListIds={showedListIds}
              setShowedListIds={setShowedListIds}
              breakPoints={breakPoints}
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
            />
          ) : (
            <FavoriteTasks
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const TaskGroups = ({
  taskId,
  setTaskId,
  showedListIds,
  setShowedListIds,
  breakPoints,
  taskGroups,
  setTaskGroups,
}) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={breakPoints}
      className="tasklists-container"
    >
      <Masonry className="masonry-container">
        {taskGroups.map((group) =>
          showedListIds.includes(group.id) ? (
            <div key={group.id}>
              <TaskList
                taskId={taskId}
                setTaskId={setTaskId}
                showedListIds={showedListIds}
                setShowedListIds={setShowedListIds}
                group={group}
                taskGroups={taskGroups}
                setTaskGroups={setTaskGroups}
              />
            </div>
          ) : null
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};
