import PropTypes from "prop-types";

export function AddTask({ inputValue, setTasks, setInputValue, tasks, deadline, setDeadline }) {

    function addTask() {
        if (inputValue.trim() === "" || deadline === "") return;

        const newTask = {
            id: Date.now(),
            text: inputValue,
            completed: false,
            deadline,
        };

        setTasks([...tasks, newTask]);

        setInputValue("");
        setDeadline("");
    }
    
    function addInputValue(event) {
        setInputValue(event.target.value);
    }

    function handleKey(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function addDeadline(event) {
        setDeadline(event.target.value);
    }


    return (
        <div className="top-container">
            <input
                type="text"
                placeholder="Enter a task"
                value={inputValue}
                onChange={addInputValue}
                onKeyDown={handleKey}
            />
            <input type="date" 
                value={deadline}
                onChange={addDeadline} />
            <button className="add-task-btn" onClick={addTask}>
                Add
            </button>
        </div>
    );
}

AddTask.propTypes = {
    inputValue: PropTypes.string.isRequired,
    setTasks: PropTypes.func.isRequired,
    setInputValue: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            deadline: PropTypes.string.isRequired,
        })
    ).isRequired,
    deadline: PropTypes.string.isRequired,
    setDeadline: PropTypes.func.isRequired,
};