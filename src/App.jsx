import useFetch from "./hooks/useFetch";

export const App = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/articles",
  );

  console.log("DATA:", data);
  console.log("LOADING:", loading);
  console.log("ERROR:", error);
};

export default App;
