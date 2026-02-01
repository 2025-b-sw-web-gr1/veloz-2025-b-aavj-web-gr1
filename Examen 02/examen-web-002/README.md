# 🏆 API RESTful con NestJS, SQLite y Swagger

Proyecto educativo que implementa una API RESTful completa en NestJS con documentación interactiva mediante Swagger (OpenAPI).

## 📋 Descripción

API para gestionar equipos de fútbol y sus jugadores con:
- ✅ Base de datos SQLite
- ✅ Relación 1-a-muchos (Teams → Players)
- ✅ 11 endpoints CRUD funcionales
- ✅ Documentación automática con Swagger
- ✅ Interfaz interactiva para probar endpoints

## 🎯 Características Principales

### API RESTful
- 6 endpoints para Teams
- 5 endpoints para Players
- Manejo completo de errores
- Validación de datos

### Swagger (OpenAPI)
- 🔍 Documentación automática en `/api`
- 📝 Decoradores en todos los endpoints
- 🧪 Interfaz interactiva para probar
- 📖 Esquemas de peticiones y respuestas

## 🛠️ Tecnologías

- **NestJS** v11 - Framework TypeScript
- **TypeORM** v0.3 - ORM para bases de datos
- **SQLite3** - Base de datos relacional
- **Swagger/OpenAPI** - Documentación automática
- **TypeScript** - Lenguaje tipado

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

Si obtienes error sobre `@nestjs/mapped-types`:
```bash
npm install @nestjs/mapped-types
```

### 2. Ejecutar el servidor

```bash
npm run start:dev
```

El servidor estará disponible en:
- **API**: `http://localhost:3000`
- **Swagger**: `http://localhost:3000/api` ⭐

## 📖 Acceder a Swagger

Una vez que el servidor esté corriendo, accede a la documentación interactiva:

```
http://localhost:3000/api
```

Desde aquí puedes:
- Ver todos los endpoints disponibles
- Ver ejemplos de peticiones y respuestas
- Probar los endpoints directamente
- Explorar los modelos y esquemas

## 📊 Endpoints Disponibles

### TEAMS
```
GET    /teams                    → Obtener todos los equipos
POST   /teams                    → Crear un equipo
GET    /teams/:id                → Obtener un equipo
PUT    /teams/:id                → Actualizar un equipo
DELETE /teams/:id                → Eliminar un equipo
GET    /teams/:id/players        → Obtener jugadores del equipo
```

### PLAYERS
```
GET    /players                  → Obtener todos los jugadores
POST   /players                  → Crear un jugador
GET    /players/:id              → Obtener un jugador
PUT    /players/:id              → Actualizar un jugador
DELETE /players/:id              → Eliminar un jugador
```

## 🧪 Ejemplos de Uso

### Crear un equipo
```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Madrid", "country": "Spain"}'
```

### Obtener todos los equipos
```bash
curl http://localhost:3000/teams
```

### Crear un jugador
```bash
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kylian Mbappé",
    "position": "Forward",
    "teamId": 1
  }'
```

### Obtener jugadores de un equipo
```bash
curl http://localhost:3000/teams/1/players
```

## 🔌 Decoradores Swagger Utilizados

### En Controladores
```typescript
@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  @Get()
  @ApiOperation({ summary: 'Obtener todos los equipos' })
  @ApiResponse({ status: 200, description: 'Equipos obtenidos' })
  findAll() { }
}
```

### En DTOs
```typescript
export class CreateTeamDto {
  @ApiProperty({ example: 'Barcelona', description: 'Nombre del equipo' })
  name: string;

  @ApiProperty({ example: 'España', description: 'País del equipo' })
  country: string;
}
```

### En Entidades
```typescript
@Entity()
export class Team {
  @ApiProperty({ example: 1, description: 'ID único' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Barcelona', description: 'Nombre' })
  @Column()
  name: string;
}
```

## 📁 Estructura del Proyecto

```
src/
├── main.ts                     ← Configuración Swagger
├── app.module.ts               ← TypeORM
├── entities/
│   ├── team.entity.ts
│   └── player.entity.ts
├── teams/
│   ├── teams.controller.ts
│   ├── teams.service.ts
│   └── dto/
│       ├── create-team.dto.ts
│       └── update-team.dto.ts
└── players/
    ├── players.controller.ts
    ├── players.service.ts
    └── dto/
        ├── create-player.dto.ts
        └── update-player.dto.ts
```

## 🗄️ Base de Datos

- **Tipo**: SQLite
- **Archivo**: `db.sqlite` (generado automáticamente)
- **Tablas**:
  - `teams` (id, name, country)
  - `players` (id, name, position, teamId)
- **Relación**: Teams (1) → Players (Many)

## 📚 Documentación Adicional

- **README-SWAGGER.md** - Guía detallada de Swagger
- **SETUP.md** - Instrucciones de configuración
- **EXAMPLES.md** - Ejemplos de peticiones HTTP

## 📝 Comandos Disponibles

```bash
npm run start          # Modo producción
npm run start:dev     # Modo desarrollo
npm run start:prod    # Build + producción
npm run build         # Compilar TypeScript
npm run test          # Tests unitarios
npm run test:watch    # Tests con watch
npm run lint          # Linter
```

## 🌐 URLs Importantes

| URL | Descripción |
|-----|------------|
| http://localhost:3000/api | Swagger UI |
| http://localhost:3000/api-json | Especificación OpenAPI |
| http://localhost:3000/teams | API Teams |
| http://localhost:3000/players | API Players |

## ✅ Criterios de Evaluación

| Criterio | Estado |
|----------|--------|
| Proyecto con código fuente | ✅ |
| Swagger instalado y configurado | ✅ |
| Endpoints documentados | ✅ |
| DTOs documentados | ✅ |
| Entidades documentadas | ✅ |
| Documentación en /api | ✅ |
| README completo | ✅ |

## 🚀 Primeros Pasos

1. **Instalar dependencias**: `npm install`
2. **Ejecutar servidor**: `npm run start:dev`
3. **Acceder a Swagger**: `http://localhost:3000/api`
4. **Probar endpoints**: Usa la interfaz Swagger o curl

## 📞 Notas Importantes

- La base de datos se crea automáticamente al iniciar
- Swagger se actualiza en tiempo real con hot-reload
- Todos los decoradores están configurados correctamente
- Las relaciones 1-a-muchos funcionan con cascade delete

---

**Proyecto completado con Documentación Automática** ✨

Accede a `http://localhost:3000/api` para explorar la API completamente documentada.
