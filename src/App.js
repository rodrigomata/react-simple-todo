import './App.css';
import { useReducer } from 'react'

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
    default:
      return [state]
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(appReducer, [])
  return (
    <main>
      <h1 className="title">Todo list app</h1>
      <button onClick={() => dispatch({ type: 'add' })}>Add</button>
      <ul className="list">
        {state.map(item => <li key={item.id}>{ item.text }</li>)}
      </ul>
    </main>
  );
}

export default TodoApp;
