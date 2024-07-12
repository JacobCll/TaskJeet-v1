import { useState } from "react";
import "./App.css";

import TaskList from "./components/TaskList";
import Header from "./components/Header";
import MainMenu from "./components/MainMenu";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function TodoApp() {
  const [groupId, setGroupId] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [taskGroups, setTaskGroups] = useState([]);
  const [mainMenu, setMainMenu] = useState(true);
  const [selection, setSelection] = useState("all-tasks");
  let breakPoints;
  // dynamic masonry
  switch (taskGroups.length) {
    case 1:
      breakPoints = { 900: 1 };
      break;
    case 2:
      breakPoints = { 900: 2, 750: 1 };
  }

  // const breakPoints = { 350: 1, 670: 2, 870: 3, 1080: 4, 1500: 5 };

  console.log(taskGroups);
  return (
    <div className="app-container">
      <Header
        mainMenu={mainMenu}
        setMainMenu={setMainMenu}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="app-body">
        {mainMenu && (
          <MainMenu
            selection={selection}
            setSelection={setSelection}
            taskGroups={taskGroups}
            setTaskGroups={setTaskGroups}
            groupId={groupId}
            setGroupId={setGroupId}
          />
        )}
        <TaskGroups
          breakPoints={breakPoints}
          taskGroups={taskGroups}
          setTaskGroups={setTaskGroups}
        />
      </div>
    </div>
  );
}

const TaskGroups = ({ breakPoints, taskGroups, setTaskGroups }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={breakPoints}
      className="tasklists-container"
    >
      <Masonry className="masonry-container" style={{}}>
        {taskGroups.map((group) => (
          <div key={group.id}>
            <TaskList
              groupId={group.id}
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
            />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
