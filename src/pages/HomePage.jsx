import useFetch from "../hooks/useFetch";

export const HomePage = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/articles");

  if (loading) {
    return <p>Cargando artículos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Inicio</h1>

      {data?.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
