import React, { useState } from "react";
import logo1 from '../../assets/1.png'
import logo6 from '../../assets/6.png'
import logop1 from '../../assets/p1.png'
import logop2 from '../../assets/p2.png'
import logop3 from '../../assets/p3.png'
import logop4 from '../../assets/p4.png'


function CardProfesor({ nombre, imagen }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img className="w-full h-48 object-cover" src={imagen} alt={nombre} />
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">{nombre}</h3>
      </div>
    </div>
  );
}

export const Home = () => {
  return (
    <div>
      <div>
        <img src={logo1} alt="Error al cargar la imagen" />
      </div>
      <div>
        <img src={logo6} alt="Error al cargar la imagen" />
      </div>

      <div className="containercards" style={{ backgroundColor: "#121212" }}>
        <h1
          style={{
            fontFamily: "Anton, sans-serif",
            fontWeight: "bolder",
            fontSize: "3rem",
            color: "#fff",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          ELEGÍ TU ENTRENADOR
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-12">
          <CardProfesor nombre="Juan Perez" imagen={logop1} />
          <CardProfesor nombre="Milena Rojas" imagen={logop3} />
          <CardProfesor nombre="Mariano Molina" imagen={logop2} />
          <CardProfesor nombre="Bárbara Díaz" imagen={logop4} />
        </div>
      </div>
    </div>
  );
};
