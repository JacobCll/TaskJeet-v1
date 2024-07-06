import { Fragment, useState } from "react";
import TaskList from "./components/TaskList";
import ToolBar from "./components/ToolBar";
import "./App.css";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function TodoApp() {
  let [groupId, setGroupId] = useState(0);
  let [searchText, setSearchText] = useState("");
  let [taskGroups, setTaskGroups] = useState([]);
  return (
    <div>
      <h1 className="app-title">TaskJeet</h1>
      <ToolBar
        taskGroups={taskGroups}
        setTaskGroups={setTaskGroups}
        searchText={searchText}
        setSearchText={setSearchText}
        groupId={groupId}
        setGroupId={setGroupId}
      />
      <hr />

      <TaskGroups taskGroups={taskGroups} setTaskGroups={setTaskGroups} />
    </div>
  );
}

const breakPoints = { 350: 1, 670: 2, 870: 3, 1080: 4, 1500: 5 };
const TaskGroups = ({ taskGroups, setTaskGroups }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
      <Masonry className="tasklists-container">
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
