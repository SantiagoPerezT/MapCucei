import "./App.css";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function App() {
  return (
    <div>
      <h1>MERN Curso</h1>

      <button
        onClick={async () => {
          const res = await fetch(`${URL}/modulo`);
          const data = await res.json();
          console.log(data);
        }}
      >
        Users
      </button>
    </div>
  );
}

export default App;
