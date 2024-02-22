import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "react-native-modal-datetime-picker";
import TaskListContext from "./taskListContext";

const Form = ({ style, buttonName = "Add", task }) => {
	// const [showDatePicker, setShowDatePicker] = React.useState(false);
	const { setTaskList } = React.useContext(TaskListContext);
	const [taskName, setTaskName] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [dueDate, setDueDate] = React.useState(new Date());
	const [priority, setPriority] = React.useState(2);
	const priot = [
		{ label: "Low", value: 1 },
		{ label: "Normal", value: 2 },
		{ label: "High", value: 3 },
	];
	// const handleFocus = () => {
	// 	setShowDatePicker(true);
	// };
	React.useEffect(() => {
		if (task) {
			setTaskName(task.taskName || "");
			setDescription(task.description || "");
			setDueDate(task.dueDate);
			setPriority(task.priority || 2);
		}
	}, [task]);
	const handleTaskAction = () => {
		const taskData = {
			taskName,
			description,
			dueDate,
			priority,
		};
		if (buttonName === "Update") {
			const index = global.taskList.findIndex((t) => t.taskName === task.taskName);
			if (index !== -1) {
				global.taskList = global.taskList.map((t, i) => (i === index ? taskData : t));
			}
			console.log(global.taskList);
		} else {
			global.taskList.push(taskData);
			console.log(global.taskList);
			setTaskList([...global.taskList]);
			setTaskName("");
			setDescription("");
			setDueDate(new Date());
			setPriority(2);
		}
	};
	return (
		<View style={style}>
			<TextInput
				style={styles.inputText}
				onChangeText={setTaskName}
				placeholder="Add new task ..."
				value={taskName}
			/>
			<Text style={styles.fieldTitle}>Description</Text>
			<TextInput style={styles.inputArea} multiline={true} onChangeText={setDescription} value={description} />
			<View style={styles.container}>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<Text style={styles.fieldTitle}>Due Date</Text>
					<TextInput style={styles.inputText} placeholder={dueDate} />
					{/* <DateTimePicker
						mode="date"
						isVisible={showDatePicker}
						date={date}
						onConfirm={(date) => {
							setDate(date);
							setShowDatePicker(false);
						}}
						onCancel={() => {
							setShowDatePicker(false);
						}}
					/> */}
				</View>
				<View style={{ flex: 1, flexDirection: "column" }}>
					<Text style={styles.fieldTitle}>Priority</Text>
					<Dropdown
						style={styles.dropdown}
						mode="auto"
						data={priot}
						defaultValue={priority}
						labelField="label"
						valueField="value"
						placeholder="Normal"
						value={priority}
						onChange={(item) => {
							setPriority(item.value);
						}}
					/>
				</View>
			</View>
			<Pressable onPress={handleTaskAction} style={styles.buttonStyle}>
				<Text style={styles.textWhite}>{buttonName}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginRight: 20,
	},
	inputText: {
		height: 40,
		borderWidth: 1,
		padding: 10,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	inputArea: {
		borderWidth: 1,
		height: 150,
		verticalAlign: "top",
		marginHorizontal: 20,
		marginBottom: 20,
		padding: 10,
	},
	fieldTitle: {
		fontWeight: "bold",
		marginLeft: 20,
		marginBottom: 20,
	},
	flexBox: {
		flex: 3,
		flexDirection: "row",
	},
	buttonStyle: {
		height: 40,
		borderRadius: 5,
		marginHorizontal: 20,
		marginTop: 50,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#45ab3c",
		elevation: 3,
	},
	textWhite: {
		color: "#ffffff",
		fontSize: 20,
	},
	dropdown: {
		marginLeft: 20,
		borderWidth: 1,
		paddingLeft: 10,
	},
});

export default Form;
