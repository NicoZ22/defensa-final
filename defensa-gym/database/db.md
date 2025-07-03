# Base de datos json - Estructura
{
**Admin**
  "admins": [
		{
			"id": "1",
			"rol": "admin",
			"contraseña": "123",
			"nombre": "Nicolas",
			"apellido": "Zelarayan",
			"edad": "21",
			"email": "nicolas@gmail.com",
			"tel": "3813334444",
			"dni": "45123456",
			"foto": "",
			"descripción": "",
			"redes": []
		}
	],
**Empleado**
  "empleados": [
			{
			"id": "1",
			"rol": "empleado",
			"contraseña": "123",
			"nombre": "Juan",
			"apellido": "Pérez",
			"edad": "30",
			"email": "juanperez1@gmail.com",
			"tel": "3811111111",
			"dni": "40123456",
			"foto": "juanperez1.png",
			"descripción": "Entrenador personal con experiencia en fitness.",
			"redes": []
			}
  ],
**Socio**
  "socios": [
    {
      "id": "1",
      "rol": "socio",
      "contraseña": "123",
      "nombre": "Nicolas",
      "apellido": "Zelarayan",
      "edad": "21",
      "email": "nicoz123@gmail.com",
      "tel": "3821111111",
      "dni": "50123456",
      "foto": "",
      "descripción": "Me encanta pasar tiempo con mis amigos y familia.",
      "redes": []
    }
	],
**Disciplina**
  "disciplinas": [
    {
      "id": "1",
      "categoria": "Fitness",
      "nombre": "Yoga",
      "descripción": "Disciplina que combina movimientos físicos, respiración y meditación para mejorar la flexibilidad y reducir el estrés.",
      "foto": "yoga.png",
      "sector": "Sala de yoga",
      "clases": [
        {
          "id": "1",
          "entrenador": {
            "id": "2",
            "nombre": "María Gómez"
          },
          "socios": [
            {
              "id": "1",
              "nombre": "Nicolas Zelarayan"
            },
            {
              "id": "2",
              "nombre": "Sofía Rodríguez"
            }
          ],
          "dias": "Lunes y miércoles",
          "horarios": "18:00-19:30",
          "nivel": "Principiante"
        }
      ]
    }
	],
}