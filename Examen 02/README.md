# ✅ Examen 02 - API RESTful con NestJS

## 📌 Descripción del Proyecto

Este proyecto implementa una **API RESTful completa** en **NestJS** conectada a una base de datos **SQLite** mediante **TypeORM**, con una relación **1 a muchos** entre Equipos (Teams) y Jugadores (Players).

## 🎯 Objetivos Cumplidos

✅ **Configuración del Proyecto**
- Proyecto NestJS creado (`nest new examen-web-002`)
- Todas las dependencias instaladas
- Conexión a SQLite configurada en `app.module.ts`

✅ **Entidades Definidas**
- **Team**: id, name, country
- **Player**: id, name, position, teamId
- Relación 1 a muchos implementada correctamente
- Cascade delete configurado

✅ **Endpoints RESTful Implementados**

**TEAMS (Equipos):**
- ✅ GET `/teams` → obtener todos los equipos
- ✅ GET `/teams/:id` → obtener un equipo por ID
- ✅ POST `/teams` → crear un equipo
- ✅ PUT `/teams/:id` → actualizar un equipo
- ✅ DELETE `/teams/:id` → eliminar un equipo
- ✅ GET `/teams/:id/players` → obtener jugadores de un equipo

**PLAYERS (Jugadores):**
- ✅ GET `/players` → obtener todos los jugadores
- ✅ GET `/players/:id` → obtener un jugador por ID
- ✅ POST `/players` → crear un jugador
- ✅ PUT `/players/:id` → actualizar un jugador
- ✅ DELETE `/players/:id` → eliminar un jugador

✅ **Documentación Completa**
- README.md con instrucciones de instalación
- SETUP.md con guía de configuración detallada
- EXAMPLES.md con ejemplos de todas las peticiones
- swagger.yaml con documentación OpenAPI
- .gitignore para gestión de versiones

## 📁 Estructura del Proyecto

```
examen-web-002/
├── src/
│   ├── main.ts
│   ├── app.module.ts              (Configuración TypeORM)
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── entities/
│   │   ├── team.entity.ts
│   │   └── player.entity.ts
│   ├── teams/
│   │   ├── teams.module.ts
│   │   ├── teams.controller.ts
│   │   ├── teams.service.ts
│   │   └── dto/
│   │       ├── create-team.dto.ts
│   │       └── update-team.dto.ts
│   └── players/
│       ├── players.module.ts
│       ├── players.controller.ts
│       ├── players.service.ts
│       └── dto/
│           ├── create-player.dto.ts
│           └── update-player.dto.ts
├── package.json
├── tsconfig.json
├── README.md                      (Documentación principal)
├── SETUP.md                       (Guía de configuración)
├── EXAMPLES.md                    (Ejemplos de uso)
├── swagger.yaml                   (OpenAPI)
└── .gitignore
```

## 🚀 Cómo Ejecutar

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run start:dev
```

El servidor estará disponible en: **http://localhost:3000**

### 3. Probar endpoints
```bash
# Crear un equipo
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Madrid", "country": "Spain"}'

# Obtener todos los equipos
curl http://localhost:3000/teams
```

## 🗄️ Base de Datos

- **Tipo**: SQLite
- **Archivo**: `db.sqlite` (generado automáticamente)
- **Sincronización**: Habilitada (synchronize: true)
- **Tablas creadas automáticamente**:
  - `teams` (id, name, country)
  - `players` (id, name, position, teamId)

## 📋 Criterios de Evaluación

| Criterio | Estado |
|----------|--------|
| Proyecto subido al repositorio | ✅ |
| Conexión SQLite configurada | ✅ |
| Entidades con relación 1-a-muchos | ✅ |
| Endpoints CRUD implementados | ✅ |
| GET para obtener todos | ✅ |
| GET por ID | ✅ |
| POST para crear | ✅ |
| PUT para actualizar | ✅ |
| DELETE para eliminar | ✅ |
| Endpoint GET equipos/:id/players | ✅ |
| README claro y completo | ✅ |

## 📚 Documentación Disponible

1. **README.md** - Guía principal del proyecto
2. **SETUP.md** - Instrucciones detalladas de instalación
3. **EXAMPLES.md** - Ejemplos de todas las peticiones
4. **swagger.yaml** - Documentación API en formato OpenAPI

## 🛠️ Tecnologías

- **NestJS** v11.x - Framework TypeScript
- **TypeORM** v0.x - ORM para bases de datos
- **SQLite3** - Base de datos relacional
- **TypeScript** - Lenguaje tipado
- **Node.js** v16+

## ✨ Características Adicionales

- ✅ Manejo de errores con excepciones HTTP
- ✅ Validación de datos con DTOs
- ✅ Relaciones bidireccionales configuradas
- ✅ Cascade delete en eliminación de equipos
- ✅ Carga de relaciones (relations)
- ✅ Código limpio y bien estructurado
- ✅ Modularidad completa

## 🔗 Recursos Adicionales

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación TypeORM](https://typeorm.io/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [REST API Best Practices](https://restfulapi.net/)

## 📝 Comandos Disponibles

```bash
npm run start          # Iniciar en modo producción
npm run start:dev     # Iniciar con hot-reload
npm run start:prod    # Build y ejecutar producción
npm run build         # Compilar TypeScript
npm run test          # Ejecutar tests
npm run test:watch    # Tests con watch
npm run test:cov      # Tests con coverage
npm run lint          # Ejecutar linter
```

---

**Proyecto completado y listo para evaluación** ✅

