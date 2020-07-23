import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Axios from "axios";
import Loading from "./components/Loading";

const URI = "http://localhost:5000";

function App() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  function getTodos() {
    return Axios.get(`${URI}/todos`)
      .then((resposta) => setTodos(resposta.data))
      .catch(console.log("erro ao buscar to-dos"));
  }

  useEffect(getTodos, []);

  const updateTodo = (selectedTodo) => {
    return Axios.patch(`${URI}/todos/${selectedTodo.id}`, {
      done: !selectedTodo.done,
    })
      .then(getTodos)
      .catch(console.log("erro ao atualizar to-dos"));
  };

  //Criado a função caso deseje deletar.
  function deleteTodo(selectedTodo) {
    Axios.delete(`${URI}/todos/${selectedTodo.id}`)
      .then(getTodos)
      .catch(console.log("erro ao atualizar to-dos"));
  }

  const addTodo = (newTodo) => {
    Axios.post(`${URI}/todos`, {
      title: newTodo,
      done: false,
    })
      .then(getTodos)
      .catch(console.log("erro ao salvar to-dos"));
  };

  const handleToggle = async (selectedTodo) => {
    setLoading(true);
    await updateTodo(selectedTodo);
    setLoading(false);
  };

  const handleAdd = async (newTodo) => {
    setLoading(true);
    await addTodo(newTodo);
    setLoading(false);
  };

  return (
    <div className="App">
      <Loading status={loading} />
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
