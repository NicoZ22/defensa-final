# Agregar rutas al path 
--> path.js
const NOMBRE = '/nombre'

export { ..., NOMBRE }

# Renderizar las paginas navegables por react-router-dom
--> Rutas.jsx

const rutas = [
    { path: NOMBRE, element: <ComponentePage/> },
]

--> usar parametros de rutas

retun (

    <Routes>
      {rutas.map((ruta) => (
        <Route key={ruta.path} path={ruta.path} element={ruta.element} />
      ))}
    
    // debajo del map
      <Route path={`${SOCIO}/:id`} element={<SocioPage/>} />
)