import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Axios from "axios";

const URI = "http://localhost:5000";

function App() {
  const [todos, setTodos] = useState([]);

  function getTodos() {
    Axios.get(`${URI}/todos`)
      .then((resposta) => setTodos(resposta.data))
      .catch(console.log("erro ao buscar to-dos"));
  }

  useEffect(getTodos, []);

  const handleToggle = (selectedTodo) => {
    Axios.patch(`${URI}/todos/${selectedTodo.id}`, {
      done: !selectedTodo.done,
    })
      .then(getTodos)
      .catch(console.log("erro ao atualizar to-dos"));
  };

  //Criado a função caso deseje deletar.
  function deleteTodos(selectedTodo) {
    Axios.delete(`${URI}/todos/${selectedTodo.id}`)
      .then(getTodos)
      .catch(console.log("erro ao atualizar to-dos"));
  }

  const handleAdd = (newTodo) => {
    Axios.post(`${URI}/todos`, {
      title: newTodo,
      done: false,
    })
      .then(getTodos)
      .catch(console.log("erro ao salvar to-dos"));
  };

  return (
    <div className="App">
      <List
        items={todos}
        title="Todo list"
        onToggle={handleToggle}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default App;
