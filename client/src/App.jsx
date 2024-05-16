import "./App.css";

function App() {
  return (
    <div>
      <h1>MERN Curso</h1>
      <button
        onClick={async () => {
          const res = await fetch("http://localhost:3000/modulo");
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
