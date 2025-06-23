import React, { useState } from 'react'


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




const Main = () => {
return (
    <div>
        <div>
            <img src="/archivos/1.png" alt="Error al cargar la imagen" />
        </div>
        <div>
            <img src="/archivos/6.png" alt="Error al cargar la imagen" />
        </div>
       
        <div className="containercards" style={{ backgroundColor: "#121212" }}>

            <h1 style={{ fontFamily: 'Anton, sans-serif', fontWeight: 'bolder', fontSize: '3rem', color: '#fff', textAlign: 'center', fontStyle: 'italic' }}>
                ELEGÍ TU ENTRENADOR
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-12">
                <CardProfesor nombre="Juan Perez" imagen="/archivos/p1.jpg" />
                <CardProfesor nombre="Milena Rojas" imagen="/archivos/p3.avif" />
                <CardProfesor nombre="Mariano Molina" imagen="/archivos/p2.jpg" />
                <CardProfesor nombre="Bárbara Díaz" imagen="/archivos/p4.avif" />
            </div>
        </div>
    </div>
)
}


export default Main
 