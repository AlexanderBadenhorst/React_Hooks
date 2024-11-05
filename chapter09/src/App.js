import React, { createContext, useContext, useReducer } from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
// import { UserContext } from "./index";
// import { Button } from "react-bootstrap";

const todosinitialState = {
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" },
  ],
};

function todosReducer(state, action) {
  switch (action.type) {
    /************CREATING************/
    case "add":
      const newToDo = { id: uuidv4(), text: action.payload };
      // add new todo onto array
      const addedToDos = [...state.todos, newToDo];
      // spread our state and assign todos
      return { ...state, todos: addedToDos };

    /************UPDATING************/
    case "edit":
      const updatedToDo = { ...action.payload };
      //find the todo by id
      const updatedToDoIndex = state.todos.findIndex(
        (t) => t.id === action.payload.id
      );
      //create a new array with the changed todo in between
      //update todos text
      const updatedToDos = [
        ...state.todos.slice(0, updatedToDoIndex),
        updatedToDo,
        ...state.todos.slice(updatedToDoIndex + 1),
      ];
      return { ...state, todos: updatedToDos };

    /************DELETING************/
    case "delete":
      //filters through array object we choose to link
      //state.todos.filter checks for each element and filters for only todos whose id is not equal to the todo’s id in
      //the payload (the todo to be deleted).
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
    default:
      return todosinitialState;
  }
}

export const TodosContext = createContext();

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosinitialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  );
}

// //setting initial aplication state
// const initialState = {
//   count: 0,
// };

// //reducer function
// function reducer(state, action) {
//   //different action types update the application state in different ways
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1 };
//     case "decrement":
//       return { count: state.count - 1 };
//     case "reset":
//       return initialState;
//     default:
//       return initialState;
//   }
// }

// //use context hook
// //function App (){
// // const value = useContext(UserContext)
// // return <div>
// // Received, {value}
// // </div>
// // }

// //use reducer hook
// //displatch calls reducer function methods
// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <div>
//       Count: {state.count}
//       <br />
//       <Button onClick={() => dispatch({ type: "increment" })}>Increment</Button>
//       <Button
//         variant="secondary"
//         onClick={() => dispatch({ type: "decrement" })}
//       >
//         Decrement
//       </Button>
//       <Button variant="success" onClick={() => dispatch({ type: "reset" })}>
//         Reset
//       </Button>
//     </div>
//   );
// }

export default App;
