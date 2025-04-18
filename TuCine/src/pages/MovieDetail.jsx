// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import { BarraInicio } from "../components/BarraInicio";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const API_KEY = import.meta.env.API_KEY;

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=4d53c57540ce374357a8420e9ea74436&language=es-ES`
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Error al obtener detalles:", err);
      }
    };

    getMovie();
  }, [id]);

  if (!movie) return <p>Cargando detalles...</p>;

  return (
    <Container>
      <BarraInicio />

      <Card >
        <Row className="g-0">
          <Col md={5}>
            <Card.Img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="Imagen"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Fecha de estreno: {movie.release_date}
                </ListGroup.Item>
                <ListGroup.Item>
                  Calificación: {movie.vote_average}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
