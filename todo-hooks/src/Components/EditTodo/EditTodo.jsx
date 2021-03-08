import React, { useState } from "react";
import styles from "../Todo/styles.module.css";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"

import { editTodo, getTodoData } from "../../Redux/todo/actionCreaters";
import { Subtasks } from "../Todo/Subtasks";
import { v4 as uuid } from "uuid";
import { RadioButtons } from "../Todo/RadioButtons";
import { CheckBox } from "../Todo/CheckBox";
import { Notifications } from "../Notifications";

export const EditTodo = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [subtasks, setSubtasks] = useState([]);
    const [subTitle, setSubTitle] = useState("");
    const [category, setCategory] = useState("todo");
    const [personal, setPersonal] = useState(false);
    const [official, setOfficial] = useState(false);
    const [others, setOthers] = useState(false);

    const [open, setOpen] = useState(false)

    const todo = useSelector((state) => state.todo.todo);
    const message = useSelector((state) => state.todo.message);
    const loading = useSelector((state) => state.todo.loading);
    const error = useSelector((state) => state.todo.error);

    const dispatch = useDispatch();
    const history = useHistory()

    const { id } = useParams();

    React.useEffect(() => {

        const findTodo = todo.find((item) => {
            console.log(item.id, "item.id");
            return item.id.toString() === id.toString();
        });
        console.log(findTodo, "find todo");

        setTitle(findTodo.title);
        setDescription(findTodo.description);
        setDate(findTodo.date);
        setSubtasks(findTodo.subtasks);
        setCategory(findTodo.category);
        setOfficial(findTodo.official);
        setPersonal(findTodo.personal);
        setOthers(findTodo.others);
    }, []);

    function handleAddSubTask() {
        const payload = {
            title: subTitle,
            id: uuid(),
            status: false,
        };

        setSubtasks((subtasks) => [...subtasks, payload]);
    }

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

    const handleEditTodo = () => {
        const payload = {
            title,
            description,
            date,
            subtasks,
            category: category,
            personal: personal,
            official: official,
            others: others,
        };
        console.log(payload);
        dispatch(editTodo(payload, id)).then(dispatch(getTodoData()));
        setOpen(true)
        setTimeout( () => {
            !error && history.push("/")

        }, 2000)
        
        
    };

    const handleClose = ( reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    console.log(subtasks);
    return (
        <>
            editpage
            <div className={styles.createTodo}>
                <div className={styles.todoHeader}>
                    <div className={styles.leftBox}>
                        <div className={styles.title}>
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.description}>
                            <textarea
                                type="text"
                                placeholder="description"
                                name="description"
                                value={description}
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
                            {/* display all sub tasks here  */}
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
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                id=""
                                required
                            />
                        </div>
                        <div className="createTaskButton">
                            <button onClick={handleEditTodo}>edit task</button>
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
