import React from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
function App() {
  return (
    <div className="App bg-black h-screen flex flex-col place-items-center">
      <AddTodo />
    </div>
  );
}

export default App;
