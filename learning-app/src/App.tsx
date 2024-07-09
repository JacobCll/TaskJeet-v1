import { Fragment, useState } from "react";
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
            taskGroups={taskGroups}
            setTaskGroups={setTaskGroups}
            groupId={groupId}
            setGroupId={setGroupId}
          />
        )}
        <TaskGroups taskGroups={taskGroups} setTaskGroups={setTaskGroups} />
      </div>
    </div>
  );
}

const breakPoints = { 350: 1, 670: 2, 870: 3, 1080: 4, 1500: 5 };
const TaskGroups = ({ taskGroups, setTaskGroups }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={breakPoints}
      className="tasklists-container"
    >
      <Masonry>
        {taskGroups.map((group) => (
          <Fragment key={group.id}>
            <TaskList
              groupId={group.id}
              taskGroups={taskGroups}
              setTaskGroups={setTaskGroups}
            />
          </Fragment>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
