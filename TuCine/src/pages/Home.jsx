import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardFilm } from "../components/CardFilm";
import "../styles/Home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { BarraInicio } from "../components/BarraInicio";

const ACCESS_TOKEN = import.meta.env.ACCESS_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${ACCESS_TOKEN}`,
  },
};

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
      .then((res) => setMovies(res.data.results));
  }, []);

  return (
    <Container>
      <BarraInicio />
      <br />
      <Row className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <CardFilm movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
