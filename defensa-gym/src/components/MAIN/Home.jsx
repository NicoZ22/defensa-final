import { useState, useEffect } from 'react';
import axios from 'axios';
import gym1 from '../../assets/FONDOS/gym1.png';
import gym2 from '../../assets/FONDOS/gym2.png';
import { URL_EMPLEADOS } from '../../utils/endpoints';
import '../../styles/MAIN/home.css';
import { Carousel, Card } from 'react-bootstrap';

export const Home = () => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const responseEmpleados = await axios.get(URL_EMPLEADOS);
        setEmpleados(responseEmpleados.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerEmpleados();
  }, []);

  return (
    <div className="home-amparo-container">
      <div className="home-amparo-imagenes">
        <div className="home-amparo-imagen">
          <img src={gym1} alt="Error al cargar la imagen" />
        </div>
        <div className="home-amparo-imagen">
          <img src={gym2} alt="Error al cargar la imagen" />
        </div>
      </div>

      <h1 className="home-amparo-title">ELEGÍ TU ENTRENADOR</h1>

      <Carousel>
        {empleados.reduce((acc, empleado, index) => {
          const chunkIndex = Math.floor(index / 3);
          if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
          }
          acc[chunkIndex].push(empleado);
          return acc;
        }, []).map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-around">
              {chunk.map((empleado) => (
                <Card className="card-amparo" key={empleado.id} style={{ width: '18rem', marginBottom: '50px' }}>
                  <Card.Img className="card-amparo-img" variant="top" src={`/ENTRENADORES/${empleado.foto}`} />
                  <Card.Body className="card-amparo-body">
                    <Card.Title className="card-amparo-title">{empleado.nombre} {empleado.apellido}</Card.Title>
                    <Card.Text className="card-amparo-text">{empleado.descripción}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};