import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { filterByStatus } from "../../helper/todosHelper";
import { setStatusFilter, clearCompleteTodo } from "../../features/todosSlice";

const Footer = () => {
  const todoList = useSelector((state) => state.todos.todoList)
  const status = useSelector((state) => state.todos.status)
  
  const numOfTodos = todoList.length
  const numOfTodosLeft = filterByStatus(todoList, "ACTIVE").length

  const dispatch = useDispatch()

  const filterBtns = [
    {
      title: "All",
      isActived: status === "ALL",
      onClick: () => dispatch(setStatusFilter("ALL")),
      link: "",
    },
    {
      title: "Active",
      isActived: status === "ACTIVE",
      onClick: () => dispatch(setStatusFilter("ACTIVE")),
      link: "active",
    },
    {
      title: "Completed",
      isActived: status === "COMPLETED",
      onClick: () => dispatch(setStatusFilter("COMPLETED")),
      link: "completed",
    },
  ];

  const handleRemoveTodoIsActive = () => {
    dispatch(clearCompleteTodo())
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numOfTodosLeft}</strong>
        <span> </span>
        <span>{numOfTodosLeft <= 1 ? "item" : "items"}</span>
        <span> left</span>
      </span>

      <ul className="filters">
        {filterBtns.map((btn) => (
          <FilterBtn key={`btn${btn.title}`} {...btn} />
        ))}
      </ul>
      {numOfTodos > numOfTodosLeft && (
        <button className="clear-completed" onClick={handleRemoveTodoIsActive}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

const FilterBtn = (props) => {
  const { title, onClick, link, isActived } = props;
  return (
    <>
      <li>
        <a
          href={`#/${link}`}
          className={`${isActived ? "selected" : ""}`}
          onClick={onClick}
        >
          {title}
        </a>
      </li>
      <span></span>
    </>
  );
};

export default Footer;
