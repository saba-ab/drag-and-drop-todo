import React from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import DroppableBox from "./components/DroppableBox";
function App() {
  return (
    <div className="App bg-black h-screen flex flex-col place-items-center">
      <AddTodo />
      <DroppableBox />
    </div>
  );
}

export default App;
