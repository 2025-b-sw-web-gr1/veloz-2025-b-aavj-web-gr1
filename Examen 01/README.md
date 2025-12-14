# 🚀 Taller de APIs REST - JSONPlaceholder

Proyecto educativo para aprender sobre peticiones HTTP, testing de APIs con Bruno y documentación con Swagger/OpenAPI.

## 📋 Descripción

Este repositorio contiene ejercicios prácticos para comprender el funcionamiento de las APIs REST, utilizando [JSONPlaceholder](https://jsonplaceholder.typicode.com/) como API de prueba.

## 🛠️ Tecnologías Utilizadas

- **Bruno** - Cliente de API para testing
- **Swagger/OpenAPI 3.0** - Documentación de APIs
- **JSONPlaceholder** - API REST fake para pruebas

## 📁 Estructura del Proyecto

```
.
├── Clase-008/                    # Colección de peticiones Bruno
│   ├── get-all-posts.bru
│   ├── create-post.bru
│   ├── get-all-users.bru
│   └── ...
├── api-documentation.yaml        # Documentación Swagger/OpenAPI
└── README.md
```

## 🎯 Objetivos del Taller

### Parte 1: Testing con Bruno
- ✅ Realizar peticiones HTTP (GET, POST, PUT, PATCH, DELETE)
- ✅ Comprender códigos de respuesta HTTP
- ✅ Trabajar con parámetros y body de peticiones
- ✅ Entender headers y content-types

### Parte 2: Documentación con Swagger
- ✅ Documentar endpoints de una API REST
- ✅ Definir esquemas de datos (schemas)
- ✅ Generar documentación interactiva
- ✅ Probar APIs directamente desde la documentación

## 🚀 Cómo Usar Este Proyecto

### Testing con Bruno

1. **Instalar Bruno**
   ```bash
   # Descargar desde https://www.usebruno.com/
   # O instalar vía package manager
   brew install bruno  # macOS
   ```

2. **Abrir la colección**
   - Abre Bruno
   - File → Open Collection
   - Selecciona la carpeta `Clase-008`

3. **Ejecutar peticiones**
   - Selecciona cualquier archivo `.bru`
   - Click en "Send" para ejecutar
   - Observa la respuesta HTTP

### Documentación con Swagger

1. **Ver la documentación**
   - Ve a [Swagger Editor](https://editor.swagger.io/)
   - Copia el contenido de `api-documentation.yaml`
   - Pégalo en el editor

2. **Probar endpoints**
   - Expande cualquier endpoint
   - Click en "Try it out"
   - Modifica parámetros si es necesario
   - Click en "Execute"

## 📚 Recursos Documentados

La API incluye 6 recursos principales:

| Recurso | Endpoints | Descripción |
|---------|-----------|-------------|
| **Posts** | 6 | Publicaciones de blog |
| **Comments** | 2 | Comentarios en posts |
| **Albums** | 3 | Álbumes de fotos |
| **Photos** | 2 | Fotografías |
| **Todos** | 3 | Lista de tareas |
| **Users** | 2 | Usuarios del sistema |

### Ejemplos de Endpoints

```http
GET    /posts              # Obtener todos los posts
GET    /posts/1            # Obtener post por ID
POST   /posts              # Crear nuevo post
PUT    /posts/1            # Actualizar post completo
PATCH  /posts/1            # Actualizar post parcialmente
DELETE /posts/1            # Eliminar post
GET    /comments?postId=1  # Filtrar comentarios por post
```

## 🎓 Conceptos Aprendidos

### Métodos HTTP
- **GET** - Obtener recursos (lectura)
- **POST** - Crear nuevos recursos
- **PUT** - Actualizar recursos completos (reemplazo)
- **PATCH** - Actualizar recursos parcialmente (modificación)
- **DELETE** - Eliminar recursos

### Códigos de Respuesta HTTP
- **200 OK** - Petición exitosa
- **201 Created** - Recurso creado exitosamente
- **404 Not Found** - Recurso no encontrado
- **500 Internal Server Error** - Error del servidor

### Headers Importantes
```
Content-Type: application/json
Authorization: Bearer token
Accept: application/json
```

## 🔗 Enlaces Útiles

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - API de prueba
- [Bruno Documentation](https://docs.usebruno.com/) - Guía de Bruno
- [OpenAPI Specification](https://swagger.io/specification/) - Estándar OpenAPI
- [HTTP Status Codes](https://httpstatuses.com/) - Códigos de respuesta HTTP

## 👨‍💻 Autor

Desarrollado como parte del curso de Desarrollo Web

## 📄 Licencia

Este proyecto es de uso educativo.