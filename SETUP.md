# 🚀 Guía de Configuración del Proyecto

Este documento proporciona instrucciones detalladas para configurar y ejecutar el proyecto de API RESTful con NestJS y SQLite.

## 📋 Requisitos Previos

- Node.js versión 16+ (recomendado 18+)
- npm versión 7+
- Un editor de código (Visual Studio Code, WebStorm, etc.)
- Herramientas para hacer peticiones HTTP (curl, Postman, Insomnia, etc.)

## 🔧 Pasos de Instalación

### 1. Clonar o descargar el proyecto

```bash
# Si está en un repositorio
git clone <url-del-repositorio>
cd examen-web-002
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todos los paquetes necesarios:
- `@nestjs/common` - Core de NestJS
- `@nestjs/core` - Core de NestJS
- `@nestjs/platform-express` - Servidor Express
- `@nestjs/typeorm` - Integración TypeORM
- `@nestjs/mapped-types` - DTOs automáticos (PartialType)
- `typeorm` - ORM para bases de datos
- `sqlite3` - Driver SQLite
- Y otras dependencias

### 3. Verificar la instalación

```bash
npm run build
```

Si todo está correcto, debería generar una carpeta `dist/` sin errores.

## 🎯 Ejecutar el Proyecto

### Modo Desarrollo (con hot-reload)

```bash
npm run start:dev
```

**Salida esperada:**
```
[9:45:30 AM] Starting compilation in watch mode...
[9:45:40 AM] Successfully compiled 15 files with tsc
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [NestFactory] Starting Nest application...
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [InstanceLoader] TeamsModule dependencies initialized
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [InstanceLoader] PlayersModule dependencies initialized
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [RoutesResolver] TeamsController {/teams}: routes registered
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [RoutesResolver] PlayersController {/players}: routes registered
[Nest] 27890  - 01/31/2026, 9:45:40 AM     LOG [NestApplication] Nest application successfully started
Listening on port 3000
```

El servidor estará disponible en: **http://localhost:3000**

### Modo Producción

```bash
npm run build
npm run start:prod
```

## 🧪 Probar los Endpoints

### 1. Crear un equipo

```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manchester United",
    "country": "England"
  }'
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Manchester United",
  "country": "England"
}
```

### 2. Obtener todos los equipos

```bash
curl http://localhost:3000/teams
```

### 3. Crear un jugador

```bash
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cristiano Ronaldo",
    "position": "Forward",
    "teamId": 1
  }'
```

### 4. Obtener jugadores de un equipo

```bash
curl http://localhost:3000/teams/1/players
```

## 📁 Estructura del Proyecto Explicada

```
examen-web-002/
├── src/
│   ├── main.ts                    # Punto de entrada de la aplicación
│   ├── app.module.ts              # Módulo principal (configuración de TypeORM)
│   ├── app.controller.ts          # Controlador de prueba
│   ├── app.service.ts             # Servicio de prueba
│   │
│   ├── entities/                  # Definición de entidades de BD
│   │   ├── team.entity.ts         # Entidad Team con relación @OneToMany
│   │   └── player.entity.ts       # Entidad Player con relación @ManyToOne
│   │
│   ├── teams/                     # Módulo de Teams
│   │   ├── teams.module.ts        # Configuración del módulo
│   │   ├── teams.controller.ts    # Rutas y handlers HTTP
│   │   ├── teams.service.ts       # Lógica de negocios
│   │   └── dto/
│   │       ├── create-team.dto.ts
│   │       └── update-team.dto.ts
│   │
│   └── players/                   # Módulo de Players
│       ├── players.module.ts
│       ├── players.controller.ts
│       ├── players.service.ts
│       └── dto/
│           ├── create-player.dto.ts
│           └── update-player.dto.ts
│
├── dist/                          # Código compilado (generado)
├── node_modules/                  # Dependencias (generado)
├── db.sqlite                      # Base de datos SQLite (generado)
├── package.json                   # Dependencias del proyecto
├── tsconfig.json                  # Configuración de TypeScript
├── README.md                      # Documentación principal
├── SETUP.md                       # Este archivo
└── swagger.yaml                   # Documentación OpenAPI
```

## 🗄️ Base de Datos

### Ubicación
La base de datos SQLite se crea automáticamente en:
```
db.sqlite
```

### Tablas Creadas

**Tabla `teams`:**
```sql
CREATE TABLE "teams" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) NOT NULL,
  "country" varchar(100) NOT NULL
);
```

**Tabla `players`:**
```sql
CREATE TABLE "players" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "name" varchar(100) NOT NULL,
  "position" varchar(50) NOT NULL,
  "teamId" integer NOT NULL,
  FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE
);
```

### Resetear la Base de Datos

```bash
# Eliminar la base de datos
rm db.sqlite

# Reiniciar la aplicación - se recreará automáticamente
npm run start:dev
```

## 🐛 Solución de Problemas

### Error: "Port 3000 is already in use"

```bash
# Matar el proceso que está usando el puerto
lsof -i :3000
kill -9 <PID>

# O cambiar el puerto en src/main.ts
```

### Error: "Cannot find module '@nestjs/typeorm'"

```bash
# Reinstalar las dependencias
npm install
```

### Error: "Cannot find module '@nestjs/mapped-types'"

```bash
# Este módulo es necesario para los DTOs con PartialType
npm install @nestjs/mapped-types
```

Este error puede ocurrir si npm install no instaló todas las dependencias correctamente.

### Error de conexión a base de datos

- Verificar permisos de carpeta
- Eliminar db.sqlite si existe
- Reiniciar la aplicación

### TypeScript errors

```bash
# Limpiar la compilación anterior
rm -rf dist/
npm run build
```

## 📊 Herramientas Recomendadas para Probar

### 1. **curl** (línea de comandos)
```bash
curl -X GET http://localhost:3000/teams
```

### 2. **Postman** (GUI)
- Descargar de https://www.postman.com/downloads/
- Crear nueva colección
- Importar endpoints

### 3. **Insomnia** (GUI)
- Descargar de https://insomnia.rest/
- Similar a Postman

### 4. **HTTPie** (CLI mejorado)
```bash
pip install httpie
http GET http://localhost:3000/teams
```

## 📝 Comandos Útiles

```bash
# Iniciar desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Ejecutar producción
npm run start:prod

# Ver logs
npm run start:dev | grep "LOG"

# Ejecutar tests
npm run test

# Ejecutar tests con coverage
npm run test:cov
```

## 🔐 Variables de Entorno (Opcional)

Crear archivo `.env`:
```
NODE_ENV=development
DATABASE_PATH=db.sqlite
PORT=3000
```

## 📚 Recursos Adicionales

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/docs.html)
- [REST API Best Practices](https://restfulapi.net/)

## ✅ Checklist de Verificación

- [ ] Node.js instalado (v16+)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Proyecto compila sin errores (`npm run build`)
- [ ] Servidor inicia correctamente (`npm run start:dev`)
- [ ] Base de datos SQLite se crea automáticamente
- [ ] Endpoints responden correctamente
- [ ] Relación 1-a-muchos funciona
- [ ] README documentado
- [ ] Proyecto en repositorio

---

**¡El proyecto está listo para usar! 🎉**
