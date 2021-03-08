import React from "react";
import { useSelector } from "react-redux";
import { TodoCard } from "./TodeCard/TodoCard";
import SpringList from 'react-spring-dnd';



export const DoneCategory = ({ deleteTodo }) => {
    const todo = useSelector((state) => state.todo.todo);

    console.log(todo, "done category");
    return (
        <>
            {todo
                ?.filter((item) => item.category === "done")
                .map((item) => {
                    return (
                        <TodoCard
                            tasks={item}
                            key={item.id}
                            deleteTodo={deleteTodo}
                        />
                    );
                })}
        </>
    );
};
