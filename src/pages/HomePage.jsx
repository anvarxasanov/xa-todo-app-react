import { AddTask } from "../components/AddTask";
import { Tasks } from "../components/Tasks";
import { useState, useEffect } from "react";

export function HomePage() {

    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [deadline, setDeadline] = useState([]);
    const [sortBy, setSortBy] = useState("default");

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortBy === "date") {
            return new Date(a.deadline) - new Date(b.deadline);
        }
        if (sortBy === "completed") {
            if (a.completed !== b.completed) {
                return Number(a.completed) - Number(b.completed);
            }
            return 0;
        }

        return a.id - b.id;
    });
    
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    
    return (
        <>
            <title>Todo App React</title>
            <div className="main-content">
                <h3>ToDo App React</h3>

                <AddTask
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setTasks={setTasks}
                    tasks={tasks}
                    deadline={deadline}
                    setDeadline={setDeadline}
                />

                <div className="sort-container">
                    <button
                        className={`sort-btn ${sortBy === "date" ? "active" : ""}`}
                        onClick={() => setSortBy(sortBy === "date" ? "default" : "date")}
                    >By date</button>
                    <button
                        className={`sort-btn ${sortBy === "completed" ? "active" : ""}`}
                        onClick={() => setSortBy(sortBy === "completed" ? "default" : "completed")}
                    > Completed last</button>
                </div>

                <Tasks tasks={sortedTasks} setTasks={setTasks} />
            </div>
        </>
    );
}
