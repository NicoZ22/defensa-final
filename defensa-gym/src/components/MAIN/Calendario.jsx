import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_DISCIPLINAS } from "../../utils/endpoints";
import '../../styles/MAIN/calendario.css'

export const Calendario = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth());
  const [anio, setAnio] = useState(new Date().getFullYear());
  const [dias, setDias] = useState([]);

  useEffect(() => {
    const cargarDisciplinas = async () => {
      try {
        const response = await axios.get(URL_DISCIPLINAS);
        setDisciplinas(response.data);
      } catch (error) {
        console.error("Error al cargar disciplinas:", error);
      }
    };
    cargarDisciplinas();
  }, []);

  useEffect(() => {
    // Generar días del mes
    const diasDelMes = [];
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    for (let i = primerDia.getDate(); i <= ultimoDia.getDate(); i++) {
      const dia = new Date(anio, mes, i);
      diasDelMes.push({
        dia: dia.getDate(),
        diaSemana: dia.toLocaleString("es-ES", { weekday: "long" }),
        clases: [],
      });
    }
    // Agregar clases a los días correspondientes
    disciplinas.forEach((disciplina) => {
      disciplina.clases.forEach((clase) => {
        const diasClase = clase.dias.split(" y ");
        diasClase.forEach((diaClase) => {
          const diaSemana = diaClase.trim();
          diasDelMes.forEach((dia) => {
            if (dia.diaSemana.toLowerCase() === diaSemana.toLowerCase()) {
              dia.clases.push({
                disciplina: disciplina.nombre,
                horarios: clase.horarios,
              });
            }
          });
        });
      });
    });
    setDias(diasDelMes);
  }, [mes, anio, disciplinas]);

  const handleMesAnterior = () => {
    if (mes === 0) {
      setMes(11);
      setAnio(anio - 1);
    } else {
      setMes(mes - 1);
    }
  };

  const handleMesSiguiente = () => {
    if (mes === 11) {
      setMes(0);
      setAnio(anio + 1);
    } else {
      setMes(mes + 1);
    }
  };

  return (
    <div className="calendario-juan">
      <h1>Calendario</h1>
      <div className="mes-juan">
        <button onClick={handleMesAnterior}>Mes anterior</button>
        <span>
          {new Date(anio, mes).toLocaleString("es-ES", {
            month: "long",
          })}{" "}
          {anio}
        </span>
        <button onClick={handleMesSiguiente}>Mes siguiente</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Clases</th>
          </tr>
        </thead>
        <tbody>
          {dias.map((dia, index) => (
            <tr key={index}>
              <td>
                {dia.dia} {dia.diaSemana}
              </td>
              <td>
                {dia.clases.map((clase, index) => (
                  <div key={index} className="clases-juan">
                    {clase.disciplina} - {clase.horarios}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};