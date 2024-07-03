import { useState } from "react";
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
      <h1 className="app-title">Swiftask</h1>
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

const TaskGroups = ({ taskGroups, setTaskGroups }) => {
  return (
    <ResponsiveMasonry>
      <Masonry className="tasklists-container">
        {taskGroups.map((group) => (
          <div className="tasks-list-container" key={group.id}>
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
