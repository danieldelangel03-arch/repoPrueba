import "./App.css";
import useGames from "./Hooks/games";
import Form from "./Component/Form/Form";

function App() {
  const { games, loading, error } = useGames();

  return (
    <div className="App">
      <h1>Juegos Divertidos</h1>
      {loading && <p className="status">Cargando giveaways…</p>}
      {error && (
        <p className="status status--error" role="alert">
          No se pudo cargar la lista: {error}. En desarrollo usa{" "}
          <code>npm run dev</code> (el proxy de Vite evita CORS).
        </p>
      )}
      {!loading && !error && games.length === 0 && (
        <p className="status">No hay giveaways para mostrar.</p>
      )}
      <div className="card-container">
        {games.map((game) => (
          <Form
            key={game.id}
            title={game.title}
            image={game.image}
            description={game.description}
            status={game.status}
            url={game.url}
          />
        ))}
      </div>
    </div>
  );
}

export default App;