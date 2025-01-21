"use client";
import "../globals.css";
import React from "react";
import { Task, TaskStatus } from "../Interfaces/tasks";
import { useTasks } from "../Interfaces/taskContext";


export default function TaskList() {

    // const [tasks, setTasks] = React.useState<Task[]>([]);
    const { tasks, setTasks } = useTasks();
    const [newTask, setNewTask] = React.useState<{ title: string; description: string }>(
        { title: "", description: "" });
    const [editTaskId, setEditTaskId] = React.useState<number | null>(null);

    // ADD/EDIT
    const handleAddOrEditTask = () => {
        if (newTask.title.trim() === "" || newTask.description.trim() === "") return;

        if (editTaskId) {
            setTasks(
                tasks.map((task) =>
                    task.id === editTaskId
                        ? { ...task, title: newTask.title, description: newTask.description }
                        : task
                )
            );
            setEditTaskId(null);
        } else {
            const task: Task = {
                id: Date.now(),
                title: newTask.title,
                description: newTask.description,
                status: "To Do",
            };
            setTasks([...tasks, task]);
        }
        setNewTask({ title: "", description: "" });
    };
    const editTask = (task: Task) => {
        setEditTaskId(task.id);
        setNewTask({ title: task.title, description: task.description });
    };
    // //LOCAL STORAGE
    // React.useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    //         setTasks(savedTasks);
    //     }
    // }, []);
    // React.useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         localStorage.setItem("tasks", JSON.stringify(tasks));
    //     }
    // }, [tasks]);

    //CANCEL
    const cancelTask = () => {
        setNewTask({
            title: "", description: ""
        })
        setEditTaskId(null);
    };

    // DELETE
    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // UPDATE STATUS
    const updateTaskStatus = (id: number, newStatus: TaskStatus) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Task Title*"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border p-2 rounded w-full md:w-1/2 mb-2 text-black"
                />
            </div>
            <div>
                <textarea
                    placeholder="Task Description*"
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="border p-2 rounded w-full md:w-1/2 mb-2 text-black"
                />
            </div>
            <h5 className="mb-4">* Mandatory fields</h5>
            <div className="mb-6">
                <button
                    onClick={handleAddOrEditTask}
                    className={`bg-blue-500 text-white px-4 py-2 rounded ${editTaskId ? "bg-green-500" : ""
                        }`}
                >
                    {editTaskId ? "Update Task" : "Add Task"}
                </button>
                <button onClick={cancelTask} className="bg-zinc-600 text-white px-4 py-2 ml-2 rounded">
                    Cancel
                </button>
            </div>


            <h1 className="text-xl font-semibold mb-4 underline">Status</h1>

            {(["To Do", "In Progress", "Done"] as TaskStatus[]).map((status) => (
                <div key={status} className="mb-6">
                    <h2 className="font-semibold mb-2">{status}</h2>
                    <ul className="space-y-2">
                        {tasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                                <li
                                    key={task.id}
                                    className="border rounded p-4"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold">{task.title}</h3>
                                        <p className="text-sm text-gray-600 break-words mb-4">{task.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <div>
                                            <select
                                                value={task.status}
                                                onChange={(e) =>
                                                    updateTaskStatus(task.id, e.target.value as TaskStatus)
                                                }
                                                className="border rounded px-2 py-1 bg-slate-400"
                                            >
                                                <option value="To Do">To Do</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Done">Done</option>
                                            </select>
                                        </div>
                                        <div className="ml-auto">
                                            <button
                                                onClick={() => editTask(task)}
                                                className="text-blue-500 bg-white px-2 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};