
const TodoListItem = function ({ item, setList }) {
  const [done, setDone] = useState(false);
  console.log("todo Item:", item.message);
  return (
    <div className={`todo-item ${done ? "complete" : "pending"}`}>
      <div className="todo-item-content">{item.message}</div>
      <div className="todo-item-actions">
        <button
          type="button"
          className={`todo-item-toggle ${done ? "complete" : "pending"}`}
          onClick={() => {
            setDone(!done);
          }}
        >
          {done ? "Completed" : "Pending"}
        </button>
        <button
          type="button"
          className="todo-item-delete"
          onClick={() => {
            setList((list) => list.filter((value) => value.id !== item.id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// interface TodoListFormProps {
//   index: number;
//   setIndex: (update: number) => void;
//   setList: (action: (list: TodoItem[]) => TodoItem[]) => void;
// }

const TodoListForm = function ({ setList, index, setIndex }) {
  const [message, setMessage] = useState("");
  console.log("form render", message);
  return (
    <form
      className="todo-list-form"
      onSubmit={(e) => {
        e.preventDefault();

        setList((list) => [
          ...list,
          {
            done: false,
            message,
            id: index
          }
        ]);
        setIndex(index + 1);
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        onInput={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit" disabled={message === ""}>
        Add
      </button>
    </form>
  );
};

function TodoList() {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);
  console.log("todolist wrap render");
  return (
    <>
      <TodoListForm setList={setList} index={index} setIndex={setIndex} />
      <div className="todo-list">
        {list.map((item) => (
          <TodoListItem key={item.id} item={item} setList={setList} />
        ))}
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoList />
    </div>
  );
}
