import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Form from "./form";
import TaskListContext from "./taskListContext";

const TodoList = () => {
	const [checked, setChecked] = React.useState({});
	const [showTask, setShowTask] = React.useState([]);
	const { taskList, setTaskList } = React.useContext(TaskListContext);
	const handlePress = (task) => {
		setShowTask((prev) => {
			const isTaskSelected = prev.find((t) => t.taskName === task.taskName);
			if (isTaskSelected) {
				return prev.filter((t) => t.taskName !== task.taskName);
			} else {
				return [...prev, task];
			}
		});
		console.log(global.taskList);
	};
	const handleCheck = (taskName) => {
		setChecked((prev) => ({
			...prev,
			[taskName]: !prev[taskName],
		}));
	};
	const handleRemove = (taskName) => {
		setTaskList((prev) => prev.filter((task) => task.taskName !== taskName));
	};
	const handleBulkRemove = () => {
		setTaskList((prev) => prev.filter((task) => !checked[task.taskName]));
		setChecked({});
	};
	React.useEffect(() => {
		setTaskList(global.taskList);
	}, [global.taskList]);
	return (
		<View style={{ width: "55%" }}>
			<Text
				style={{
					alignSelf: "center",
					fontSize: 20,
					fontWeight: "bold",
					marginHorizontal: 20,
					marginTop: 20,
					marginBottom: 40,
				}}>
				To Do List
			</Text>
			<TextInput style={{ borderWidth: 1, paddingLeft: 10, height: 40, width: "100%" }} placeholder="Search..." />
			{taskList.map((task, index) => (
				<View
					key={index}
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 20,
						borderWidth: 1,
						padding: 15,
						justifyContent: "space-between",
					}}>
					<View style={{ flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								width: "100%",
							}}>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<BouncyCheckbox
									isChecked={checked[task.taskName] || false}
									onPress={() => handleCheck(task.taskName)}
								/>
								<Text style={{ marginLeft: 15, fontSize: 18 }}>{task.taskName}</Text>
							</View>
							<View style={{ flexDirection: "row-reverse", alignItems: "center" }}>
								<Pressable
									onPress={() => {
										handleRemove(task.taskName);
									}}
									style={{
										borderRadius: 5,
										backgroundColor: "red",
										height: 40,
										width: 125,
										alignItems: "center",
										justifyContent: "center",
										marginHorizontal: 15,
									}}>
									<Text style={{ color: "white", fontSize: 20 }}>Remove</Text>
								</Pressable>
								<Pressable
									onPress={() => {
										handlePress(task);
									}}
									style={{
										borderRadius: 5,
										backgroundColor: "blue",
										height: 40,
										width: 125,
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Text style={{ color: "white", fontSize: 20 }}>Detail</Text>
								</Pressable>
							</View>
						</View>
						<View style={{ flexDirection: "column" }}>
							{showTask.find((t) => t.taskName === task.taskName) && (
								<Form style={{ marginTop: 20 }} buttonName="Update" task={task} />
							)}
						</View>
					</View>
				</View>
			))}
			{Object.values(checked).some((isChecked) => isChecked) && (
				<View
					style={{
						position: "absolute",
						bottom: 0,
						width: "100%",
						backgroundColor: "#b0b0b0",
						height: 100,
						justifyContent: "center",
						paddingHorizontal: 15,
					}}>
					<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
						<Text>Bulk action:</Text>
						<View style={{ flexDirection: "row-reverse" }}>
							<Pressable
								onPress={handleBulkRemove}
								style={{
									borderRadius: 5,
									backgroundColor: "red",
									height: 35,
									width: 100,
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Text style={{ color: "white" }}>Remove</Text>
							</Pressable>
							<Pressable
								style={{
									borderRadius: 5,
									backgroundColor: "blue",
									marginRight: 15,
									height: 35,
									width: 100,
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Text style={{ color: "white" }}>Done</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}
		</View>
	);
};

export default TodoList;
