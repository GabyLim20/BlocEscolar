# 📓 Bloc School 👾  

Una aplicación web que permite a maestras crear blocs de notas, añadir comentarios y colaborar con estudiantes. Incluye autenticación por rol (admin, maestra, estudiante) y funcionalidades CRUD para blocs, usuarios, comentarios y roles.

## 🎯🚀 Skills
- Javascript
- MVC
- Programación Asíncrona	
- NodeJS
- Express
- Sequelize
- Middleware
- Github

## Estructura del Proyecto ✨🤓

#### 📁 BlocApi
| Estructura                     | Descripción                                                           |
|--------------------------------|-----------------------------------------------------------------------|
| 📁 config                  | Configuración de la base de datos y entorno.                            |
| └─ 📑 config.json         | Archivo de configuración de Sequelize. |
| └─ 📑 config.js           | Variables de entorno. |
| 📁 controllers                 | Carpeta con todos los controladores.          |
| └─ 📑 userController.js          | Controlador para manejar usuarios.  |
| └─ 📑 blocController.js         | Controlador para gestionar las notas.  |
| └─ 📑 rolController.js         | Controlador para gestionar los roles.  |
| └─ 📑 commentsController.js         | Controlador para manejar las dudas y/o comentarios.  |
| 📁 middleware           | Middlewares para validaciones y autenticación.          |
| └─ 📑 authMiddleware.js        | Middleware para autenticación.  |
| 📁 models                 | Almacena datos en formato JSON.          |
| └─ 📑 user.js         | Base de datos para usuarios.  |
| └─ 📑 bloc.js         | Base de datos de las notas.  |
| └─ 📑 comments.js         | Base de datos de comentarios.  |
| └─ 📑 rol.js         | Base de datos de los roles.  |
| └─ 📑 index.js         | Inicializa Sequelize y la conexión a la base de datos.  |
| 📁 routes           | Contiene las rutas del servidor.          |
| └─ 📄 index.js                   | Todas las rutas.                         |
| 📄 .env                   | Archivo de configuración de variables de entorno.                                       |
| README.md                      | Instrucciones y detalles del proyecto.                               |
| package.json                   | Archivo de configuración del proyecto.                               |

##  👩🏻‍💻📓✍🏻💡 Como configurar el Proyecto
### Pasos a seguir en consola
Ejecuta el siguiente bloque de comandos en tu terminal para configurar el proyecto:

**1. Instalar la dependencia**
```bash
  npm install
```
**2. Inicializar el proyecto**
```bash
  npm init -y
```
**3. Instalar la dependencia**
```bash
npm install express sequelize mysql2 bcrypt express-rate-limit
```

#### 📜🛠️ Ejecución
El proyecto inicializa con:
```bash
npm start
```
### 🌐 Endpoints Disponibles
#### 🧑‍🏫 Usuario
- POST /users – Crear un nuevo usuario.

- POST /login – Iniciar sesión y obtener token JWT.

- GET /users – Obtener todos los usuarios (admin/maestra).

- GET /users/:id – Obtener usuario por ID.

- PUT /usuarios/:id – Actualizar información del usuario (admin/maestra).

- PUT /usuarios/password/:id – Cambiar contraseña del usuario.

#### 🧑‍🎓 Rol
- POST /rol – Crear un nuevo rol.

- PUT /rol/:id – Actualizar nombre del rol.

- DELETE /rol/:id – Eliminar rol.

#### 📘 Bloc
- POST /bloc – Crear un bloc (solo maestras).

- GET /blocs – Obtener blocs creados por la maestra autenticada.

- PUT /bloc/:id – Editar bloc (solo creador y si es maestra).

- DELETE /bloc/:id – Eliminar bloc (solo creador y si es maestra).

#### 💬 Comentario
- POST /comments – Crear un comentario.

- PUT /comments/:id – Editar un comentario (solo quien lo creó).

- DELETE /comments/:id – Eliminar comentario (solo quien lo creó).

- GET /comments/:id – Ver todos los comentarios dependiendo de cada bloc.

##  👩🏻✍🏻💡 Documentación de api
Se utilizó postman [este link](https://web.postman.co/workspace/ea6766d8-70f2-4804-8ab4-3cef52f9b99c/documentation/41761112-b69bfc3e-49ea-4c6d-a2ba-c9b469ab7c22).

