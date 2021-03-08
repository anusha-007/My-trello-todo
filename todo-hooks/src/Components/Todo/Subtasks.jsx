import React from "react";
import styles from "./styles.module.css";

export const Subtasks = ({ subtasks, handleDelete, handleToggle }) => {
    return (
        <>
            {subtasks?.map((item) => {
                return (
                    <div className={styles.subTasksList} key={item.id}>
                        <input
                            type="checkbox"
                            name="subtask"
                            id={item.id}
                            onChange={() => handleToggle(item.id)}
                            checked={item.status}
                        />

                        <label
                            htmlFor={item.id}
                            className={item.status ? styles.label : null}
                        >
                            {item.title}
                        </label>

                        <button
                            style={{ marginLeft: "20px" }}
                            onClick={() => handleDelete(item.id)}
                        >
                            <img
                                className={styles.deleteImgIcon}
                                src="https://image.flaticon.com/icons/png/512/61/61848.png"
                                alt="delete"
                            />
                        </button>
                    </div>
                );
            })}
        </>
    );
};
