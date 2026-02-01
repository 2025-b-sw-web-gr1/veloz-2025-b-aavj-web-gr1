**# ✅ Examen 02 - API RESTful con Swagger y OpenAPI

## 📌 Descripción del Proyecto

Este proyecto es una evolución del **Proyecto 01** que agrega **Swagger (OpenAPI)** para documentación automática e interactiva de los endpoints RESTful.

Implementa una **API RESTful completa** en **NestJS** conectada a una base de datos **SQLite** mediante **TypeORM**, con una relación **1 a muchos** entre Equipos (Teams) y Jugadores (Players).

---

# 🎉 PROYECTO 02 COMPLETADO - Swagger + OpenAPI

## ✅ Resumen de lo Realizado

Se ha actualizado exitosamente el **Proyecto 01** con **Swagger (OpenAPI)** para documentación automática e interactiva de todos los endpoints.

---

## ✨ Nuevas Características (Proyecto 02)

- 📚 **Swagger/OpenAPI** para documentación automática
- 🧪 **Interfaz interactiva** para probar endpoints
- 📖 **Decoradores @ApiProperty, @ApiTags, @ApiOperation** en todos los endpoints
- 🔍 **Exploración visual** de modelos y esquemas
- 📝 **Documentación accesible en `/api`**

## 📦 Cambios Realizados

### 1️⃣ Instalación de Dependencias
```bash
npm install @nestjs/swagger swagger-ui-express
```

Paquetes instalados:
- `@nestjs/swagger@^7.x` - Decoradores Swagger
- `swagger-ui-express@^5.x` - Interfaz gráfica

### 2️⃣ Configuración en main.ts

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

### 3️⃣ Decoradores en Controladores

**TeamsController** y **PlayersController** ahora incluyen:
- `@ApiTags()` - Agrupa endpoints
- `@ApiOperation()` - Describe operaciones
- `@ApiResponse()` - Documenta respuestas
- `@ApiParam()` - Documenta parámetros
- `@ApiBody()` - Documenta body

### 4️⃣ Decoradores en DTOs

**CreateTeamDto**, **CreatePlayerDto** y sus actualizaciones ahora incluyen:
```typescript
@ApiProperty({
  example: 'Barcelona FC',
  description: 'Nombre del equipo',
  minLength: 2,
  maxLength: 100
})
name: string;
```

### 5️⃣ Decoradores en Entidades

**Team** y **Player** ahora incluyen:
```typescript
@ApiProperty({
  example: 1,
  description: 'ID único del equipo',
  type: 'number'
})
@PrimaryGeneratedColumn()
id: number;
```

---

## 🎯 Objetivos Cumplidos

✅ **Configuración de Swagger**
- Instalado `@nestjs/swagger` y `swagger-ui-express`
- Configurado en `main.ts` con DocumentBuilder
- Documentación accesible en `http://localhost:3000/api`

✅ **Decoradores en Endpoints**
- `@ApiTags()` - Agrupa endpoints por categoría
- `@ApiOperation()` - Describe cada operación
- `@ApiResponse()` - Documenta respuestas
- `@ApiParam()` - Documenta parámetros
- `@ApiBody()` - Documenta cuerpo de petición

✅ **Decoradores en DTOs**
- `@ApiProperty()` con ejemplos y descripciones
- Validación de tipos
- Restricciones (minLength, maxLength)

✅ **Decoradores en Entidades**
- Todas las propiedades documentadas
- Ejemplos incluidos
- Relaciones tipadas

✅ **Endpoints Documentados**
- 6 endpoints Teams
- 5 endpoints Players
- 1 endpoint especial (GET /teams/:id/players)

✅ **Documentación Completa**
- README.md con instrucciones principales
- README-SWAGGER.md con guía detallada
- SETUP.md con configuración
- EXAMPLES.md con ejemplos curl

## 📁 Estructura del Proyecto

```
examen-web-002/
├── src/
│   ├── main.ts                         ⭐ Swagger configurado
│   ├── app.module.ts
│   ├── entities/
│   │   ├── team.entity.ts              ⭐ Con @ApiProperty
│   │   └── player.entity.ts            ⭐ Con @ApiProperty
│   ├── teams/
│   │   ├── teams.controller.ts         ⭐ Con @ApiTags, @ApiOperation
│   │   ├── teams.service.ts
│   │   └── dto/
│   │       ├── create-team.dto.ts      ⭐ Con @ApiProperty
│   │       └── update-team.dto.ts
│   └── players/
│       ├── players.controller.ts       ⭐ Con @ApiTags, @ApiOperation
│       ├── players.service.ts
│       └── dto/
│           ├── create-player.dto.ts    ⭐ Con @ApiProperty
│           └── update-player.dto.ts
├── package.json
├── README.md                           (Principal)
├── README-SWAGGER.md                   (Guía Swagger)
├── SETUP.md                            (Configuración)
├── EXAMPLES.md                         (Ejemplos)
├── swagger.yaml                        (Especificación OpenAPI)
└── db.sqlite                           (Base de datos)
```

## 📊 Archivos Modificados

| Archivo | Cambio | Estado |
|---------|--------|--------|
| `src/main.ts` | Configuración Swagger | ✅ |
| `src/teams/teams.controller.ts` | Decoradores Swagger | ✅ |
| `src/teams/dto/create-team.dto.ts` | @ApiProperty | ✅ |
| `src/players/players.controller.ts` | Decoradores Swagger | ✅ |
| `src/players/dto/create-player.dto.ts` | @ApiProperty | ✅ |
| `src/entities/team.entity.ts` | @ApiProperty | ✅ |
| `src/entities/player.entity.ts` | @ApiProperty | ✅ |
| `README.md` | Documentación Swagger | ✅ |

---

## 🚀 Cómo Ejecutar

### 1. Instalar dependencias
```bash
cd examen-web-002
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run start:dev
```

### 3. Acceder a Swagger
```
http://localhost:3000/api
```

### 4. Acceder a la API
```
http://localhost:3000/teams
http://localhost:3000/players
```

## 📚 Documentación Disponible

1. **README.md** - Guía principal con Swagger
2. **README-SWAGGER.md** - Guía detallada de Swagger
3. **SETUP.md** - Instrucciones de instalación
4. **EXAMPLES.md** - Ejemplos de peticiones
5. **swagger.yaml** - Especificación OpenAPI

## 🔌 Endpoints Documentados

### TEAMS (6 endpoints)
- ✅ GET `/teams` → Obtener todos
- ✅ GET `/teams/:id` → Obtener por ID
- ✅ POST `/teams` → Crear
- ✅ PUT `/teams/:id` → Actualizar
- ✅ DELETE `/teams/:id` → Eliminar
- ✅ GET `/teams/:id/players` → Obtener jugadores del equipo

### PLAYERS (5 endpoints)
- ✅ GET `/players` → Obtener todos
- ✅ GET `/players/:id` → Obtener por ID
- ✅ POST `/players` → Crear
- ✅ PUT `/players/:id` → Actualizar
- ✅ DELETE `/players/:id` → Eliminar

---

## 🎯 Todos los Endpoints Documentados

### TEAMS (6 Endpoints)
```
✅ POST   /teams                    - Crear equipo
✅ GET    /teams                    - Obtener todos
✅ GET    /teams/:id                - Obtener por ID
✅ PUT    /teams/:id                - Actualizar
✅ DELETE /teams/:id                - Eliminar
✅ GET    /teams/:id/players        - Obtener jugadores
```

### PLAYERS (5 Endpoints)
```
✅ POST   /players                  - Crear jugador
✅ GET    /players                  - Obtener todos
✅ GET    /players/:id              - Obtener por ID
✅ PUT    /players/:id              - Actualizar
✅ DELETE /players/:id              - Eliminar
```

---

## 📊 Criterios de Evaluación

| Criterio | Estado | Detalles |
|----------|--------|---------|
| Código fuente con Swagger | ✅ | Todo en `src/` |
| Swagger instalado | ✅ | @nestjs/swagger + swagger-ui-express |
| Swagger en main.ts | ✅ | DocumentBuilder + SwaggerModule |
| Endpoints con @ApiTags | ✅ | Teams y Players |
| Endpoints con @ApiOperation | ✅ | Cada método HTTP |
| Endpoints con @ApiResponse | ✅ | Status 200, 201, 404, 400 |
| Endpoints con @ApiParam | ✅ | Todos los parámetros |
| Endpoints con @ApiBody | ✅ | Peticiones POST y PUT |
| DTOs con @ApiProperty | ✅ | Todos los DTOs |
| Entidades con @ApiProperty | ✅ | Team y Player |
| Documentación en /api | ✅ | Accesible e interactiva |
| README claro | ✅ | Con instrucciones y ejemplos |

## 📋 Criterios de Evaluación ✅

✅ Proyecto con código fuente completo
✅ Swagger instalado (`@nestjs/swagger`, `swagger-ui-express`)
✅ Swagger configurado en `main.ts`
✅ Todos los endpoints con `@ApiTags`
✅ Todos los endpoints con `@ApiOperation`
✅ Todos los endpoints con `@ApiResponse`
✅ Todos los endpoints con `@ApiParam`
✅ Todos los endpoints con `@ApiBody`
✅ Todos los DTOs con `@ApiProperty`
✅ Todas las entidades con `@ApiProperty`
✅ Documentación accesible en `/api`
✅ README claro y completo
✅ Decoradores con descripciones y ejemplos

---

## 📚 Documentación Generada

1. **README.md** - Principal con Swagger
2. **README-SWAGGER.md** - Guía Swagger detallada
3. **SETUP.md** - Configuración
4. **EXAMPLES.md** - Ejemplos curl
5. **swagger.yaml** - OpenAPI 3.0 JSON/YAML

---

## 📖 URLs de Acceso

| URL | Descripción | Función |
|-----|------------|---------|
| `http://localhost:3000/api` | **Swagger UI** | Interfaz interactiva |
| `http://localhost:3000/api-json` | OpenAPI JSON | Especificación |
| `http://localhost:3000/teams` | API Teams | Endpoint |
| `http://localhost:3000/players` | API Players | Endpoint |

---

## 🚀 Cómo Ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar servidor
npm run start:dev

# 3. Acceder a Swagger
# http://localhost:3000/api
```

---

## 🧪 Probar Endpoints

### Desde Swagger (Recomendado)
1. Accede a `http://localhost:3000/api`
2. Expande un endpoint
3. Click en "Try it out"
4. Llena los campos
5. Click en "Execute"

### Desde curl
```bash
# Crear equipo
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Madrid", "country": "Spain"}'

# Obtener equipos
curl http://localhost:3000/teams

# Crear jugador
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Mbappé", "position": "Forward", "teamId": 1}'
```

---

## 🧪 Características de Swagger UI

1. **Exploración Visual**
   - Todos los endpoints visibles
   - Agrupados por tags (teams, players)
   - Métodos HTTP diferenciados por color

2. **Documentación Completa**
   - Descripción de cada operación
   - Parámetros documentados
   - Body documentado
   - Respuestas documentadas
   - Ejemplos incluidos

3. **Pruebas Interactivas**
   - Botón "Try it out"
   - Rellenar parámetros
   - Botón "Execute"
   - Ver respuesta en tiempo real

4. **Modelos y Esquemas**
   - Team, Player, CreateTeamDto, etc.
   - Propiedades con tipos
   - Ejemplos de valores
   - Relaciones visualizadas

---

## 🌐 URLs Importantes

| URL | Descripción |
|-----|-----------|
| http://localhost:3000/api | Swagger UI ⭐ |
| http://localhost:3000/api-json | OpenAPI JSON |
| http://localhost:3000/teams | Endpoint Teams |
| http://localhost:3000/players | Endpoint Players |

## ✨ Características Implementadas

✅ Swagger interactivo en `/api`
✅ 11 endpoints completamente documentados
✅ Modelos y esquemas visualizables
✅ Ejemplos de peticiones y respuestas
✅ Pruebas directas desde la UI
✅ Especificación OpenAPI completa
✅ DTOs con validación documentada
✅ Entidades con propiedades descritas

## 📞 Comandos Rápidos

```bash
npm install               # Instalar dependencias
npm run start:dev        # Ejecutar con hot-reload
npm run build            # Compilar TypeScript
npm run start:prod       # Build + producción
```

---

## 🛠️ Dependencias Principales

```json
{
  "@nestjs/common": "^11.0.0",
  "@nestjs/core": "^11.0.0",
  "@nestjs/typeorm": "^10.0.0",
  "@nestjs/swagger": "^7.0.0",
  "@nestjs/mapped-types": "^latest",
  "swagger-ui-express": "^5.0.0",
  "typeorm": "^0.3.0",
  "sqlite3": "^5.0.0"
}
```

## 🛠️ Tecnologías

- **NestJS** v11.x - Framework TypeScript
- **TypeORM** v0.x - ORM para bases de datos
- **SQLite3** - Base de datos relacional
- **TypeScript** - Lenguaje tipado
- **Node.js** v16+

## 🗄️ Base de Datos

- **Tipo**: SQLite
- **Archivo**: `db.sqlite` (generado automáticamente)
- **Sincronización**: Habilitada (synchronize: true)
- **Tablas creadas automáticamente**:
  - `teams` (id, name, country)
  - `players` (id, name, position, teamId)

## ✨ Características Adicionales

- ✅ Manejo de errores con excepciones HTTP
- ✅ Validación de datos con DTOs
- ✅ Relaciones bidireccionales configuradas
- ✅ Cascade delete en eliminación de equipos
- ✅ Carga de relaciones (relations)
- ✅ Código limpio y bien estructurado
- ✅ Modularidad completa

## ✨ Ventajas de Swagger/OpenAPI

✨ **Documentación Automática**
- Se genera del código
- Siempre actualizada
- Sin mantenimiento manual

✨ **Interfaz Interactiva**
- Prueba endpoints sin herramientas
- Explore la API fácilmente
- Visualiza respuestas

✨ **Estándar OpenAPI**
- Compatible con herramientas
- Importable en Postman
- Documentación estandarizada

✨ **Para Desarrolladores**
- Onboarding rápido
- Comprensión clara de endpoints
- Ejemplos de uso

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

**Proyecto completado con Documentación Automática y OpenAPI** ✨

**Accede a `http://localhost:3000/api` para explorar la API completamente documentada**

---

**¡Proyecto 02 completado exitosamente!** 🚀

**Swagger está disponible y accesible en `/api`**

**Proyecto completado y listo para evaluación** ✅
