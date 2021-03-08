import React from "react";
import styles from "./styles.module.css";

export const RadioButtons = ({ handleRadioButton, value }) => {
    return (
        <>
            <div className={styles.radioButtons}>
                <div className="todo">
                    <input
                        type="radio"
                        name="Todo"
                        id="todo"
                        value="todo"
                        onChange={handleRadioButton}
                        checked={value == "todo"}
                    />
                    <label for="todo">Todo</label>
                </div>
                <div className="inProgress">
                    <input
                        type="radio"
                        name="Todo"
                        id="inProgress"
                        value="inProgress"
                        onChange={handleRadioButton}
                        checked={value == "inProgress"}
                    />
                    <label for="inProgress">In Progress</label>
                </div>
                <div className="done">
                    <input
                        type="radio"
                        name="Todo"
                        id="done"
                        value="done"
                        onChange={handleRadioButton}
                        checked={value == "done"}
                    />
                    <label for="done">Done</label>
                </div>
            </div>
        </>
    );
};
