import React from "react";
import { useSelector} from "react-redux";

import { TodoCard } from "./TodeCard/TodoCard";
import SpringList from 'react-spring-dnd';


export const TodoCategory = ({ deleteTodo }) => {
    const todo = useSelector((state) => state.todo.todo);

    console.log(todo, "cat");
    return (
        <>
            {todo
                ?.filter((item) => item.category === "todo")
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
