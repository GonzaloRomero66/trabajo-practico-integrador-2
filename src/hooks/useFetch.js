import { useState, useEffect } from "react";

const useFetch = (url) => {
  // Estamos conteniendo los datos actuales en data, para que luego sean guardados en setData,
  // y utilizamos el useState(null) porque por el momento no nos llego ningun dato del backend
  const [data, setData] = useState(null);
  // Aca estamos utlizando loading para preguntar si esta cargando la peticion de los datos,
  // y el setLoading es para poder cambiar ese dato si es que ya dejo de cargar, osea si se volvio un false el loading
  const [loading, setLoading] = useState(true);
  // En esta parte el error seria el dato donde se guardara si hay un error y estamos utilizando
  // null porque por el momento no hay un error y si eso cambia mostrando el error correspondiente de ese momento
  const [error, setError] = useState(null);
  // Es lo que ejecuta automaticamente lo que esta dentro de {}
  useEffect(() => {
    // Es una funcion donde vamos a pedir los datos correspondientes
    const fetchData = async () => {
      // Try es intenta ejecutar este codigo
      try {
        setLoading(true);
        // fetch(url) esta pidiendo la respuesta de la url, osea del backend donde response es el que guarda y
        // pusimos un await para que espere a que consiga la respuesta
        const response = await fetch(url);
        if (!response.ok) {
          // Error es lo que se utiliza para crear un objeto que es un error,
          // por eso se pone en mayuscula la E, si se pone en minuscula es una variable
          // y new error sirve  poder crear un nuevo error y Throw significa lanze el error
          //  al catch para que lo capture
          throw new Error(
            "No se logro conseguir la respuesta de la base de datos",
          );
        }
        // Estamos agarrando la respuesta que habiamos conseguido del response
        //  de antes para ahora hacerlo un json y ponerlo en result
        const result = await response.json();
        console.log(result);
        // EStamos cambiando los valores de data reemplazandolos con los de result
        setData(result);
        // El catch se encarga de si aparece un error en el try, muestre o capture el error correspondiente
      } catch (error) {
        // Estamos haciendo que el setError guarde el estado error el valor de error.message
        setError(error.message);
      } finally {
        // Finally es algo que ya da por terminado la peticion y que siempre se va a ejecutar, si hay o no un error
        // Y ponemos setLoading porque es el final de la peticion, no tiene que cargar mas nada
        setLoading(false);
      }
    };
    // Se esta ejecutando fetchData, donde luego agarrara la url del backend
    // para con el return devolver, data, loading y error
    fetchData();
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
