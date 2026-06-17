import PropTypes from "prop-types"; 

export function Tasks({ tasks, setTasks }) {
    function toggleTask(id) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter((task) => task.id !== id);

        setTasks(updatedTasks);
    }

    return (
        <div className="tasks_container">
            {tasks.map((task) => {
                return (
                    <div className="task" key={task.id}>
                        <input
                            type="checkbox"
                            className="task-checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <p className={task.completed ? "task-text completed" : "task-text"}>
                            {task.text}
                        </p>
                        <p className={task.completed ? "task-deadline completed" : "task-deadline"}>
                            {task.deadline}
                        </p>
                        <button
                            className="delete-btn"
                            onClick={() => {
                                deleteTask(task.id);
                            }}
                        >Delete</button>
                    </div>
                );
            })}
        </div>
    );
}


Tasks.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            deadline: PropTypes.string.isRequired,
        })
    ).isRequired,
    setTasks: PropTypes.func.isRequired,
};