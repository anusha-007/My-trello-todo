import React, { useState } from "react";
import styles from "./styles.module.css";
import { v4 as uuid } from "uuid";
import { Subtasks } from "./Subtasks";
import { RadioButtons } from "./RadioButtons";
import { CheckBox } from "./CheckBox";

import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom";
import { getTodoData, postTodoData } from "../../Redux/todo/actionCreaters";
import { Notifications } from "../Notifications";

export const CreateTodo = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState([]);
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("todo");
    const [personal, setPersonal] = useState(false);
    const [official, setOfficial] = useState(false);
    const [others, setOthers] = useState(true);

    const [open, setOpen] = useState(false);


    const loading = useSelector((state) => state.todo.loading);
    const error = useSelector((state) => state.todo.error);
    const message = useSelector((state) => state.todo.message);


    const dispatch = useDispatch();
    const history = useHistory()

    const handleCheckbox = (e) => {
        console.log(e.target, e.target.name, e.target.value, "checkbox");
        if (e.target.name === "Personal") {
            setPersonal((prev) => !prev);
        } else if (e.target.name === "Official") {
            setOfficial((prev) => !prev);
        } else {
            setOthers((prev) => !prev);
        }
    };

    const handleRadioButton = (e) => {
        setCategory(e.target.value);
    };

    function handleAddSubTask() {
        const payload = {
            title: subTitle,
            id: uuid(),
            status: false,
        };
        // console.log(payload,"payloaddd")

        setSubtasks((subtasks) => [...subtasks, payload]);
    }

    //post todo user data to mock server db
    const handlePostTodo = () => {
        const payload = {
            title,
            status: false,
            description,
            date,
            subtasks,
            category: category,
            personal: personal,
            official: official,
            others: others,
        };
        console.log(payload);
        dispatch(postTodoData(payload)).then(dispatch(getTodoData()));
        setOpen(true);
        setTimeout( () => {
            !error && history.push("/")

        }, 2000)
    };



    const handleDelete = (id) => {
        const updated = subtasks.filter((item) => item.id !== id);
        console.log(updated, "sub");
        setSubtasks(updated);
       
    };
    const handleToggle = (id) => {
        const updated = subtasks.map((item) =>
            item.id === id ? { ...item, status: !item.status } : item
        );
        setSubtasks(updated);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        // sidebar
        <>
            <div className={styles.createTodo}>
                <div className={styles.todoHeader}>
                    <div className={styles.leftBox}>
                        <div className={styles.title}>
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.description}>
                            <textarea
                                type="text"
                                placeholder="description"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.midBox}>
                        <div className={styles.addSubtasksBox}>
                            <input
                                type="text"
                                placeholder="add subtasks"
                                name="add-tasks"
                                onChange={(e) => setSubTitle(e.target.value)}
                            />
                            <button onClick={handleAddSubTask}>ADD</button>
                        </div>
                        <div className={styles.displaySubtasksBox}>
                            {/* display all sub tasks here */}
                            <Subtasks
                                subtasks={subtasks}
                                handleDelete={handleDelete}
                                handleToggle={handleToggle}
                            />
                        </div>
                    </div>

                    <div className={styles.rightBox}>
                        <div className={styles.date}>
                            <input
                                type="date"
                                name="date"
                                placeholder="date"
                                onChange={(e) => setDate(e.target.value)}
                                id=""
                                required
                            />
                        </div>
                        <div className="createTaskButton">
                            <button onClick={handlePostTodo}>
                                Create a task
                            </button>
                        </div>
                    </div>
                </div>

                <RadioButtons
                    handleRadioButton={handleRadioButton}
                    value={category}
                />

                <div className={styles.checkboxContainer}>
                    <CheckBox
                        handleCheckbox={handleCheckbox}
                        official={official}
                        personal={personal}
                        others={others}
                    />
                </div>
            </div>
            <div>
                {!loading && error === false && (
                    <Notifications
                        open={open}
                        handleClose={handleClose}
                        message={message}
                        severity="success"
                    />
                )}

                {error && (
                    <Notifications
                        open={open}
                        handleClose={handleClose}
                        message={message}
                        severity="error"
                    />
                )}
            </div>
           
        </>
    );
};

//title
//add task
//date
//desc
//display sub task
// create whole task
