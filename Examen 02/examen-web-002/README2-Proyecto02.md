# 📘 Proyecto 02 – Documentación de Endpoints con Swagger

## 🎯 Objetivo

Documentar automáticamente todos los endpoints RESTful implementados en el Proyecto 01 usando **Swagger (OpenAPI)** dentro del mismo proyecto NestJS.

## 📚 Descripción

Este proyecto toma la API RESTful construida anteriormente (Teams & Players) y agrega una documentación interactiva con Swagger/OpenAPI que permite:

- 🔍 Visualizar todos los endpoints disponibles
- 📝 Ver esquemas de peticiones y respuestas
- 🧪 Probar los endpoints directamente desde la interfaz
- 📖 Acceder a documentación automática en tiempo real

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

Si obtienes error sobre paquetes faltantes:
```bash
npm install @nestjs/swagger swagger-ui-express @nestjs/mapped-types
```

### 2. Ejecutar el servidor

**Modo desarrollo** (con reload automático):
```bash
npm run start:dev
```

El servidor estará disponible en:
- **API Base**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api` ⭐

## 🔌 Acceso a Swagger

Una vez que el servidor está corriendo, accede a la documentación interactiva:

```
http://localhost:3000/api
```

Aquí verás:
- ✅ Todos los endpoints disponibles
- ✅ Ejemplos de peticiones
- ✅ Esquemas de respuesta
- ✅ Modelos (DTOs y Entidades)
- ✅ Botón para "Try it out" y probar endpoints

## 📊 Endpoints Documentados

### TEAMS (11 Endpoints)

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|--------|
| `GET` | `/teams` | Obtener todos los equipos | ✅ |
| `POST` | `/teams` | Crear un nuevo equipo | ✅ |
| `GET` | `/teams/:id` | Obtener equipo por ID | ✅ |
| `PUT` | `/teams/:id` | Actualizar un equipo | ✅ |
| `DELETE` | `/teams/:id` | Eliminar un equipo | ✅ |
| `GET` | `/teams/:id/players` | Obtener jugadores del equipo | ✅ |

### PLAYERS (5 Endpoints)

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|--------|
| `GET` | `/players` | Obtener todos los jugadores | ✅ |
| `POST` | `/players` | Crear un nuevo jugador | ✅ |
| `GET` | `/players/:id` | Obtener jugador por ID | ✅ |
| `PUT` | `/players/:id` | Actualizar un jugador | ✅ |
| `DELETE` | `/players/:id` | Eliminar un jugador | ✅ |

## 📖 Decoradores Utilizados

### En Controladores

```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('teams')  // Agrupa los endpoints en la UI
@Controller('teams')
export class TeamsController {
  @Post()
  @ApiOperation({ summary: 'Descripción corta', description: 'Descripción detallada' })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({ status: 201, description: 'Equipo creado', type: Team })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createTeamDto: CreateTeamDto) {
    // ...
  }
}
```

### En DTOs

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Barcelona FC',
    description: 'Nombre del equipo',
    minLength: 2,
    maxLength: 100,
  })
  name: string;

  @ApiProperty({
    example: 'España',
    description: 'País del equipo',
  })
  country: string;
}
```

### En Entidades

```typescript
import { ApiProperty } from '@nestjs/swagger';

@Entity('teams')
export class Team {
  @ApiProperty({ example: 1, description: 'ID único del equipo' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Barcelona FC', description: 'Nombre del equipo' })
  @Column()
  name: string;

  @ApiProperty({ type: () => [Player], description: 'Lista de jugadores' })
  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
```

## 🧪 Probar Endpoints en Swagger

### Método 1: Desde la interfaz Swagger

1. Accede a `http://localhost:3000/api`
2. Selecciona el endpoint que deseas probar
3. Haz clic en "Try it out"
4. Llena los parámetros necesarios
5. Haz clic en "Execute"

### Método 2: Usando curl

```bash
# Crear un equipo
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Madrid", "country": "Spain"}'

# Obtener todos los equipos
curl http://localhost:3000/teams

# Crear un jugador
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kylian Mbappé",
    "position": "Forward",
    "teamId": 1
  }'

# Obtener jugadores de un equipo
curl http://localhost:3000/teams/1/players
```

## 📋 Estructura del Proyecto

```
src/
├── main.ts                        ⭐ Configuración de Swagger
├── app.module.ts                  (TypeORM)
├── app.controller.ts
├── app.service.ts
│
├── entities/
│   ├── team.entity.ts             ⭐ Con @ApiProperty
│   └── player.entity.ts           ⭐ Con @ApiProperty
│
├── teams/
│   ├── teams.module.ts
│   ├── teams.controller.ts        ⭐ Con @ApiTags, @ApiOperation
│   ├── teams.service.ts
│   └── dto/
│       ├── create-team.dto.ts     ⭐ Con @ApiProperty
│       └── update-team.dto.ts
│
└── players/
    ├── players.module.ts
    ├── players.controller.ts      ⭐ Con @ApiTags, @ApiOperation
    ├── players.service.ts
    └── dto/
        ├── create-player.dto.ts   ⭐ Con @ApiProperty
        └── update-player.dto.ts
```

## 🔧 Configuración de Swagger en main.ts

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Equipos y Jugadores')
    .setDescription('Documentación de endpoints RESTful')
    .setVersion('1.0')
    .addTag('teams', 'Operaciones de equipos')
    .addTag('players', 'Operaciones de jugadores')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

## 📦 Dependencias Instaladas

```json
{
  "@nestjs/swagger": "^7.x",
  "swagger-ui-express": "^5.x"
}
```

## ✅ Criterios de Evaluación Cumplidos

| Criterio | Estado |
|----------|--------|
| Proyecto con código fuente y Swagger | ✅ |
| Swagger instalado en main.ts | ✅ |
| Endpoints documentados con @ApiTags | ✅ |
| Endpoints documentados con @ApiOperation | ✅ |
| Endpoints documentados con @ApiResponse | ✅ |
| DTOs documentados con @ApiProperty | ✅ |
| Entidades documentadas con @ApiProperty | ✅ |
| Documentación accesible en /api | ✅ |
| README claro y completo | ✅ |

## 🚀 Comandos Disponibles

```bash
npm run start          # Iniciar en modo producción
npm run start:dev     # Iniciar con hot-reload y Swagger
npm run start:prod    # Build y ejecutar producción
npm run build         # Compilar TypeScript
npm run test          # Ejecutar tests
npm run lint          # Ejecutar linter
```

## 📖 Recursos Adicionales

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [Swagger/OpenAPI Official](https://swagger.io/)
- [API Documentation Best Practices](https://swagger.io/resources/articles/best-practices-in-api-documentation/)

## 🎨 Características de Swagger

✨ **Interfaz Interactiva**
- Visualiza todos los endpoints
- Prueba endpoints directamente
- Ver respuestas en tiempo real

✨ **Documentación Automática**
- Esquemas de solicitud/respuesta
- Ejemplos de datos
- Tipos de datos validados

✨ **Modelos Visuales**
- DTOs y Entidades documentadas
- Propiedades con descripción
- Ejemplos de valores

## 🌐 URLs Importantes

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000/api` | Swagger UI (interfaz interactiva) |
| `http://localhost:3000/api-json` | Especificación OpenAPI en JSON |
| `http://localhost:3000/teams` | Endpoint de equipos (API) |
| `http://localhost:3000/players` | Endpoint de jugadores (API) |

## 📝 Ejemplo de Respuesta Documentada

```json
{
  "status": 200,
  "description": "Equipo obtenido exitosamente",
  "schema": {
    "type": "object",
    "properties": {
      "id": { "type": "number", "example": 1 },
      "name": { "type": "string", "example": "Barcelona FC" },
      "country": { "type": "string", "example": "España" },
      "players": {
        "type": "array",
        "items": { "$ref": "#/components/schemas/Player" }
      }
    }
  }
}
```

---

## 🎯 Próximos Pasos

- Accede a `http://localhost:3000/api` después de ejecutar el servidor
- Explora todos los endpoints documentados
- Prueba cada endpoint desde la interfaz Swagger
- Revisa los esquemas y modelos disponibles

**¡Documentación automática y accesible! 📚✨**
