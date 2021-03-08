import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoData, deleteTodoData } from "../../Redux/todo/actionCreaters";
import { TodoCategory } from "./TodoCategory";
import styles from "./TodeCard/todoCard.module.css";
import { TodoHeader } from "./TodoHeader";
import { DoneCategory } from "./DoneCategory";
import { InProgressCategory } from "./InprogressCategory";
import { Notifications } from "../Notifications";

export const DisplayTodo = () => {

    const [open, setOpen] = useState(false)
    const message = useSelector((state) => state.todo.message);
    const error = useSelector((state) => state.todo.error);
    const loading = useSelector((state) => state.todo.loading);



    const dispatch = useDispatch();

    const deleteTodo = (id) => {
        console.log(id, "iddd");
        dispatch(deleteTodoData(id)).then(dispatch(getTodoData()));
        setOpen(true)
    };

    React.useEffect(() => {
        dispatch(getTodoData());
    }, []);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.todoCategory}>
                <header>
                    <TodoHeader
                        color="darkseagreen"
                        text="TODO"
                        bgColor="gainsboro"
                    />
                </header>

                <div className={styles.todoCards}>
                    <TodoCategory deleteTodo={deleteTodo} />
                </div>
            </div>

            {/* DoneCategory */}
            <div className={styles.todoCategory}>
                <header>
                    <TodoHeader
                        color="darkseagreen"
                        text="DONE"
                        bgColor="gainsboro"
                    />
                </header>

                <div className={styles.todoCards}>
                    <DoneCategory deleteTodo={deleteTodo} />
                </div>
            </div>

            <div className={styles.todoCategory}>
                <header>
                    <TodoHeader
                        color="darkseagreen"
                        text="InProgress"
                        bgColor="gainsboro"
                    />
                </header>

                <div className={styles.todoCards}>
                    <InProgressCategory deleteTodo={deleteTodo} />
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

            {/* {!loading && !error && <div>{message} </div>} */}
        </div>
    );
};
// display based ooncategory
// todo inprogress done takse
//todo
// inprogress
// done taska

//div-- todo
//div--inpro
//div--done
//abv all 3 in one div
// display flex
