import React from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import DroppableBox from "./components/DroppableBox";
function App() {
  return (
    <div className="App bg-black flex h-screen flex-col place-items-center w-full ">
      <AddTodo />
      <DroppableBox />
    </div>
  );
}

export default App;
