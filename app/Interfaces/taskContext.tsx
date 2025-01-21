import React from "react";
import { Task } from "../Interfaces/tasks";

interface TasksContextProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = React.createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = React.useState<Task[]>([]);

    React.useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(savedTasks);
    }, []);

    React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = (): TasksContextProps => {
    const context = React.useContext(TasksContext);
    if (!context) throw new Error("useTasks must be used within a TasksProvider");
    return context;
};
