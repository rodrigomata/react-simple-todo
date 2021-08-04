import './App.css';
import { useReducer, useState } from 'react'

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
    default:
      return [state]
  }
}

function TodoApp() {
  const [text, setText] = useState('')
  const [state, dispatch] = useReducer(appReducer, [])
  return (
    <main>
      <h1 className="title">Todo list app</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => dispatch({ type: 'add', payload: { text } })}>Add</button>
      <TodoList items={state} />
    </main>
  );
}

function TodoList({ items }) {
  return (
  <ul className="list">
    {items.map(item => <TodoItem key={item.id} {...item}></TodoItem>)}
  </ul>
  )
}

function TodoItem({ id, text }) {
  return (
  <li className="item">
    <input type="checkbox"></input>
    <span>{text}</span>
    <button>Delete</button>
  </li>)
}

export default TodoApp;
