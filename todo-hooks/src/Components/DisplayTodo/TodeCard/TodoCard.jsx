import React from "react";
import styles from "./todoCard.module.css";
import { useHistory } from "react-router-dom";
import {
    updateSubtasks
} from "../../../Redux/todo/actionCreaters";
import {  useDispatch } from "react-redux";
import {Button} from "@material-ui/core"

export const TodoCard = ({ tasks, deleteTodo }) => {
    const dispatch = useDispatch();

    const history = useHistory();
    const goToEditPage = (id) => {
        history.push(`/edit-todo/${id}`);
    };

    const handleToggleSubtask = (id, subtasksId, status) => {
        
        const payload = {
            taskId: id,
            subTaskId: subtasksId,
            status: !status,
        };
        dispatch(updateSubtasks(payload));
    };

    return (
        <div className={styles.todoCardContainer}>
            <header style={{ display: "flex" }}>
                <h3 style={{ display: "flex", flex: 1 }}>{tasks.title}</h3>
                <button
                    className={styles.deleteButton}
                    onClick={() => deleteTodo(tasks.id)}
                >
                    x
                </button>
                <Button onClick={() => goToEditPage(tasks.id)} color = "primary" variant ="outlined" >edit task </Button>
            </header>
            <div className={styles.mid}>
                <div className={styles.status}>
                    <div>
                        {tasks.personal && <span>personal</span>} |
                        {tasks.official && <span>official</span>}|
                        {tasks.others && <span>others</span>}

                    </div>
                </div>
                <div className={styles.date}>
                    <div>{tasks.date}</div>
                </div>
            </div>

            <div className={styles.description}>
                <h4>task description</h4>
                {tasks.description}
            </div>

            <div className={styles.displaySubtasks}>
                {tasks.subtasks?.map((item) => {
                    return (
                        <div key={item.id}>
                            <input
                                type="checkbox"
                                name="subtask"
                                id={item.id}
                                onChange={() =>
                                    handleToggleSubtask(
                                        tasks.id,
                                        item.id,
                                        item.status
                                    )
                                }
                                checked={item.status}
                            />

                            <label
                                htmlFor={item.id}
                                className={item.status ? styles.label : null}
                            >
                                {item.title}
                            </label>
                        </div>
                    );
                })}
            </div>
            
        </div>
    );
};
