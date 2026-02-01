# 📚 Ejemplos de Uso - Colección de Requests

Este archivo contiene ejemplos completos de todas las peticiones HTTP que puedes hacer a la API.

## 🚀 Inicio Rápido

```bash
# 1. Iniciar el servidor
npm run start:dev

# 2. En otra terminal, ejecutar los siguientes comandos curl
```

---

## 🏆 ENDPOINTS DE TEAMS (Equipos)

### 1️⃣ Crear un equipo

**POST** `/teams`

```bash
curl -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Real Madrid",
    "country": "Spain"
  }'
```

**Respuesta (201):**
```json
{
  "id": 1,
  "name": "Real Madrid",
  "country": "Spain"
}
```

---

### 2️⃣ Obtener todos los equipos

**GET** `/teams`

```bash
curl http://localhost:3000/teams
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "name": "Real Madrid",
    "country": "Spain",
    "players": [
      {
        "id": 1,
        "name": "Kylian Mbappé",
        "position": "Forward",
        "teamId": 1
      },
      {
        "id": 2,
        "name": "Jude Bellingham",
        "position": "Midfielder",
        "teamId": 1
      }
    ]
  },
  {
    "id": 2,
    "name": "Barcelona",
    "country": "Spain",
    "players": []
  }
]
```

---

### 3️⃣ Obtener un equipo por ID

**GET** `/teams/{id}`

```bash
curl http://localhost:3000/teams/1
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Real Madrid",
  "country": "Spain",
  "players": [
    {
      "id": 1,
      "name": "Kylian Mbappé",
      "position": "Forward",
      "teamId": 1
    }
  ]
}
```

---

### 4️⃣ Obtener jugadores de un equipo específico

**GET** `/teams/{id}/players`

```bash
curl http://localhost:3000/teams/1/players
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Real Madrid",
  "country": "Spain",
  "players": [
    {
      "id": 1,
      "name": "Kylian Mbappé",
      "position": "Forward",
      "teamId": 1
    },
    {
      "id": 2,
      "name": "Jude Bellingham",
      "position": "Midfielder",
      "teamId": 1
    },
    {
      "id": 3,
      "name": "Nacho Fernández",
      "position": "Defender",
      "teamId": 1
    }
  ]
}
```

---

### 5️⃣ Actualizar un equipo

**PUT** `/teams/{id}`

```bash
curl -X PUT http://localhost:3000/teams/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Real Madrid CF",
    "country": "Spain"
  }'
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Real Madrid CF",
  "country": "Spain",
  "players": []
}
```

---

### 6️⃣ Eliminar un equipo

**DELETE** `/teams/{id}`

```bash
curl -X DELETE http://localhost:3000/teams/1
```

**Respuesta (200):** (sin contenido)

---

## ⚽ ENDPOINTS DE PLAYERS (Jugadores)

### 1️⃣ Crear un jugador

**POST** `/players`

```bash
curl -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kylian Mbappé",
    "position": "Forward",
    "teamId": 1
  }'
```

**Respuesta (201):**
```json
{
  "id": 1,
  "name": "Kylian Mbappé",
  "position": "Forward",
  "teamId": 1
}
```

---

### 2️⃣ Obtener todos los jugadores

**GET** `/players`

```bash
curl http://localhost:3000/players
```

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "name": "Kylian Mbappé",
    "position": "Forward",
    "teamId": 1,
    "team": {
      "id": 1,
      "name": "Real Madrid",
      "country": "Spain"
    }
  },
  {
    "id": 2,
    "name": "Jude Bellingham",
    "position": "Midfielder",
    "teamId": 1,
    "team": {
      "id": 1,
      "name": "Real Madrid",
      "country": "Spain"
    }
  }
]
```

---

### 3️⃣ Obtener un jugador por ID

**GET** `/players/{id}`

```bash
curl http://localhost:3000/players/1
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Kylian Mbappé",
  "position": "Forward",
  "teamId": 1,
  "team": {
    "id": 1,
    "name": "Real Madrid",
    "country": "Spain"
  }
}
```

---

### 4️⃣ Actualizar un jugador

**PUT** `/players/{id}`

```bash
curl -X PUT http://localhost:3000/players/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kylian Mbappé Lottin",
    "position": "Left Forward",
    "teamId": 1
  }'
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Kylian Mbappé Lottin",
  "position": "Left Forward",
  "teamId": 1,
  "team": {
    "id": 1,
    "name": "Real Madrid",
    "country": "Spain"
  }
}
```

---

### 5️⃣ Eliminar un jugador

**DELETE** `/players/{id}`

```bash
curl -X DELETE http://localhost:3000/players/1
```

**Respuesta (200):** (sin contenido)

---

## 📋 Escenario Completo: Workflow

```bash
#!/bin/bash

# Paso 1: Crear dos equipos
echo "=== Creando equipos ==="

TEAM1=$(curl -s -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Real Madrid", "country": "Spain"}')

TEAM2=$(curl -s -X POST http://localhost:3000/teams \
  -H "Content-Type: application/json" \
  -d '{"name": "Barcelona", "country": "Spain"}')

echo "Equipo 1: $TEAM1"
echo "Equipo 2: $TEAM2"

# Paso 2: Crear jugadores para Real Madrid (teamId: 1)
echo "=== Creando jugadores para Real Madrid ==="

curl -s -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Kylian Mbappé", "position": "Forward", "teamId": 1}' | jq .

curl -s -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Jude Bellingham", "position": "Midfielder", "teamId": 1}' | jq .

curl -s -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Nacho Fernández", "position": "Defender", "teamId": 1}' | jq .

# Paso 3: Crear jugadores para Barcelona (teamId: 2)
echo "=== Creando jugadores para Barcelona ==="

curl -s -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Robert Lewandowski", "position": "Forward", "teamId": 2}' | jq .

curl -s -X POST http://localhost:3000/players \
  -H "Content-Type: application/json" \
  -d '{"name": "Gavi", "position": "Midfielder", "teamId": 2}' | jq .

# Paso 4: Obtener todos los equipos con sus jugadores
echo "=== Todos los equipos ==="
curl -s http://localhost:3000/teams | jq .

# Paso 5: Obtener jugadores de un equipo específico
echo "=== Jugadores de Real Madrid (equipo 1) ==="
curl -s http://localhost:3000/teams/1/players | jq .

# Paso 6: Obtener todos los jugadores
echo "=== Todos los jugadores ==="
curl -s http://localhost:3000/players | jq .

# Paso 7: Actualizar un equipo
echo "=== Actualizando Real Madrid ==="
curl -s -X PUT http://localhost:3000/teams/1 \
  -H "Content-Type: application/json" \
  -d '{"country": "Spain, Europe"}' | jq .
```

---

## 🛠️ Usando Postman

### Importar colección

1. Abre Postman
2. Click en "Import" (arriba a la izquierda)
3. Pega este JSON:

```json
{
  "info": {
    "name": "Sports Teams API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Teams",
      "item": [
        {
          "name": "Create Team",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/teams",
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"Real Madrid\", \"country\": \"Spain\"}"
            }
          }
        },
        {
          "name": "Get All Teams",
          "request": {
            "method": "GET",
            "url": "http://localhost:3000/teams"
          }
        },
        {
          "name": "Get Team by ID",
          "request": {
            "method": "GET",
            "url": "http://localhost:3000/teams/1"
          }
        }
      ]
    },
    {
      "name": "Players",
      "item": [
        {
          "name": "Create Player",
          "request": {
            "method": "POST",
            "url": "http://localhost:3000/players",
            "body": {
              "mode": "raw",
              "raw": "{\"name\": \"Kylian Mbappé\", \"position\": \"Forward\", \"teamId\": 1}"
            }
          }
        },
        {
          "name": "Get All Players",
          "request": {
            "method": "GET",
            "url": "http://localhost:3000/players"
          }
        }
      ]
    }
  ]
}
```

---

## 📊 Códigos de Respuesta

| Código | Significado |
|--------|------------|
| **200** | OK - Operación exitosa |
| **201** | Created - Recurso creado |
| **404** | Not Found - Recurso no encontrado |
| **500** | Internal Server Error - Error del servidor |

---

## ✅ Checklist de Pruebas

- [ ] Crear un equipo
- [ ] Obtener todos los equipos
- [ ] Obtener un equipo por ID
- [ ] Actualizar un equipo
- [ ] Obtener jugadores de un equipo
- [ ] Crear un jugador
- [ ] Obtener todos los jugadores
- [ ] Obtener un jugador por ID
- [ ] Actualizar un jugador
- [ ] Eliminar un jugador
- [ ] Eliminar un equipo

---

¡Listo para probar! 🎉
