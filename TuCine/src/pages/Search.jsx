import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { BarraInicio } from "../components/BarraInicio";

const API_KEY = import.meta.env.API_KEY;

export default function Search() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=4d53c57540ce374357a8420e9ea74436&query=${query}`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error("Error al buscar películas:", err);
      }
    };

    searchMovies();
  }, [query]);

  return (
    <Container>
      <BarraInicio />
      <div style={{ padding: "2rem" }}>
        <h2>
          Resultados para: <em>{query}</em>
        </h2>
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>
              <strong>{movie.title}</strong> (
              {movie.release_date?.split("-")[0]})
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
