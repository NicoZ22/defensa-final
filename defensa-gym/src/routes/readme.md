# Agregar rutas al path 
--> path.js
const NOMBRE = '/nombre'

export { ..., NOMBRE }

# Renderizar las paginas navegables por react-router-dom
--> Rutas.jsx

const rutas = [
    { path: NOMBRE, element: <ComponentePage/> },
]