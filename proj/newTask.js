import React from "react";
import { Text, View } from "react-native";
import Form from "./form";
import TaskListContext from "./taskListContext";

const NewTask = () => {
	return (
		<View style={{ width: "40%" }}>
			<Text
				style={{
					alignSelf: "center",
					fontSize: 20,
					fontWeight: "bold",
					marginHorizontal: 20,
					marginTop: 20,
					marginBottom: 40,
				}}>
				New Task
			</Text>
			<Form />
		</View>
	);
};

export default NewTask;
