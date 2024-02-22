import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import NewTask from "./proj/newTask";
import TodoList from "./proj/todoList";
import TaskListProvider from "./proj/taskListProvider";

export default function App() {
	if (!global.taskList) {
		global.taskList = [];
	}
	return (
		<TaskListProvider>
			<ScrollView>
				<View style={styles.container}>
					<NewTask />
					<TodoList />
				</View>
			</ScrollView>
		</TaskListProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
});
