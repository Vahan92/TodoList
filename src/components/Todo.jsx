import React, { useState, useReducer } from "react";
import { Form, Button, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { ReactComponent as Add } from "../images/add.svg";
import { ReactComponent as Delete } from "../images/trash.svg";

function TodoList() {
  const [todoFields, setTodoFields] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      todo: "",
      deadline: "",
    }
  );

  const onChangeTodo = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setNewTodo({ [name]: newValue });
  };

  const onChangeDate = (date) => {
    setNewTodo({ deadline: date });
  };

  const saveChanges = () => {
    setTodoList((todos) => [...todos, newTodo]);
    setNewTodo({ todo: "", deadline: "" });
  };

  const deleteTodo = (index) => {
    setTodoList((todos) => [...todos.filter((_, i) => i !== index)]);
  };

  return (
    <div>
      <Add
        onClick={() => {
          setTodoFields(true);
        }}
      />
      {todoFields && (
        <div>
          <Form.Group controlId="formBasicName">
            <Form.Control
              required
              onChange={onChangeTodo}
              type="text"
              name="todo"
              placeholder="Enter todo"
              value={newTodo.todo || ""}
            />
            <DatePicker
              disabled={newTodo.todo.trim().length < 4}
              selected={newTodo.deadline}
              onChange={onChangeDate}
            />
          </Form.Group>
          <Button
            disabled={newTodo.deadline.length < 1}
            variant="primary"
            onClick={saveChanges}
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setTodoFields(false);
            }}
          >
            Close
          </Button>
        </div>
      )}
      <Table responsive>
        <tbody>
          {todoList.map((todoInfo, index) => {
            return (
              <tr key={todoInfo.todo + index}>
                <td>{todoInfo.todo}</td>
                <td>{todoInfo.deadline.toLocaleString()}</td>
                <td>
                  <Delete
                    onClick={() => {
                      deleteTodo(index);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TodoList;
