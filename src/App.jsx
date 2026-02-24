import React from 'react'
import './App.css';
import imgDelete from "./assets/delete.png";
import imgEdit from "./assets/edit.png";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
const [todo, setTodo]=useState([]);
const[oldItem, setOldTodo]=useState("");
const [editmode, setEditmode]=useState(false);
const [newTodo, setNewTodo]=useState("");
 const BASE_URL="https://todo-client-assignment.onrender.com";
  const loadtodo=async()=>{
  console.log("load todo");
 const response= await axios.get(BASE_URL+"/todo");
 setTodo(response.data.data);

};

const addTodo=async()=>{
  const response= await axios.post(`${BASE_URL}/todo`,{
   item:newTodo,
  });
  setNewTodo("");
  loadtodo();
};
const editTodo=async()=>{
  const response= await axios.put(`${BASE_URL}/todo`,{
   oldItem:oldItem,
   newItem:newTodo,
  });
  loadtodo();
  setEditmode(false);
  setNewTodo("");
  oldItem("");
};
const deleteTodo=async(item)=>{
  const response= await axios.delete(`${BASE_URL}/todo`,{
   data: {item:item},
  });
    loadtodo();
};
  useEffect(()=>{
    loadtodo();
  },[]);
  return (
    <div>
      <h1 className='heading'>Todo list</h1>
      <p className='header'>{editmode ? "Edit ToDO" : "Add TODO"}</p>
      <div className='todo'>
      <div className='todo-container'>
      {todo.map((todos, index)=>{
        return(
          <div key={index} className='todo-card'>
            <p>{todos}</p>
            <div>
            <img src={imgEdit} alt="edit" className='edit-icon'
            onClick={()=>{setEditmode(true);
              setOldTodo(todos);
              setNewTodo(todos);
            }}
            />
            <img src={imgDelete} alt="delete" className='delete-icon'
            onClick={()=>deleteTodo(todos)}
            />

            </div>
            </div>
        );
      })}
      </div>
    
      </div>
      <div className='todo-item-container'>
        <input type="text" placeholder='Enter todo' className='input-todo' value={newTodo} onChange={(e)=>{
          setNewTodo(e.target.value);
        }}/>
        <button className='btn-add-todo' onClick={()=>{
          if(editmode){
            editTodo();
          }else{
            addTodo();
          }
        }}
        >
          {editmode ? "Update ToDo" : "Add ToDo"}
        </button>
      </div>
    </div>
  )
}

export default App;