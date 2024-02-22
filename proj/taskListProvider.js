import React from "react";
import TaskListContext from "./taskListContext";

const TaskListProvider = ({ children }) => {
	const [taskList, setTaskList] = React.useState([]);

	return <TaskListContext.Provider value={{ taskList, setTaskList }}>{children}</TaskListContext.Provider>;
};

export default TaskListProvider;
