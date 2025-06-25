import '../../CSS/Empleados.css';

const Empleados = () => {
    return (
        <>
            <div className="container">
                <div className='contenedor-tabla'>
                 <div className='div1'>

                    <div className="table-responsive">
                        <h2>Clase del dia</h2>
                        <table className="table table-hover table-dar" >
                            <thead>
                                <tr>
                                    <th>hora</th>
                                    <th>clase</th>
                                    <th>sala</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>08:00</td>
                                    <td>Yoga</td>
                                    <td>Sala A</td>
                                </tr>
                                <tr>
                                    <td>09:00</td>
                                    <td>Pilates</td>
                                    <td>Sala B</td>
                                </tr>
                                <tr>
                                    <td>10:00</td>
                                    <td>Zumba</td>
                                    <td>Sala C</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                

                
                    
                
                <div className='contenedor-lista-de-socios'>
                    <h2>Socios asignados</h2><ol>
                        <li>Pepito</li>
                        <li>Juanita</li>
                        <li>Encio</li>
                    </ol>
                </div>
                </div>
                </div>

                <div className="div2">

                <div className='contenedor-rutinas'>
                    <h2>rutinas</h2>
                    <ul>
                        <li>Rutina de Fuerza</li>
                        <li>Rutina de cardio</li>
                        <li>Rutina funcional</li>
                    </ul>

                </div>


                <div className='contenedor-tareas'>
                    <ul>
                        <h2>Lista de tareas</h2>
                        <li><input type="checkbox" /><span>Preparar clases</span> </li>
                        <li><input type="checkbox" /> <span>Revisar asistencia</span></li>
                        <li><input type="checkbox" /><span>Chequear rutina</span></li>
                    </ul>
                </div>
                </div>
            </div>
        </>
    )
}

export default Empleados
