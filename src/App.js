import './App.css';
import React, { useContext, useReducer, useState } from 'react'

const Context = React.createContext()

function appReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return [
        ...state,
        {
          id: new Date(),
          text: action.payload?.text || 'Sample text',
        }
      ]
    }
    case 'delete': {
      return state.filter(item => item.id !== action.payload.id)
    }
    case 'complete': {
      return state.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, completed: !item.completed }
        }
        return item
      })
    }
    default:
      return [state]
  }
}

function TodoApp() {
  const [text, setText] = useState('')
  const [state, dispatch] = useReducer(appReducer, [])
  return (
    <main>
      <Context.Provider value={dispatch}>
        <h1 className="title">Todo list app</h1>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => dispatch({ type: 'add', payload: { text } })}>Add</button>
        <TodoList items={state} />
      </Context.Provider>
    </main>
  )
}

function TodoList({ items }) {
  return (
    <ul className="list">
      {items.map(item => <TodoItem key={item.id} {...item}></TodoItem>)}
    </ul>
  )
}

function TodoItem({ id, text }) {
  const dispatch = useContext(Context)
  return (
    <li className="item">
      <input type="checkbox" onChange={() => dispatch({ type: 'complete', payload: { id } })} />
      <span>{text}</span>
      <button onClick={() => dispatch({ type: 'delete', payload: { id } })}>Delete</button>
    </li>
  )
}

export default TodoApp
