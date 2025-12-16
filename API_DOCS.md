# 📚 Documentação da API

## Endpoints Disponíveis

### 🔐 Autenticação

#### POST /api/v1/auth/login
Login do usuário.

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response 200:**
```json
{
  "token": "string",
  "user": {
    "id": 1,
    "name": "Diogo",
    "lastname": "Souza",
    "nickname": "Graciiano",
    "email": "email@email.com",
    "number": "23",
    "platform": "PS5",
    "roles": ["ROLE_USER", "ROLE_ADMIN"]
  }
}
```

**Errors:**
- 401: Credenciais inválidas
- 400: Payload inválido

---

#### POST /api/v1/auth/register
Cadastro de novo usuário.

**Request:**
```json
{
  "name": "string",
  "lastname": "string",
  "nickname": "string",
  "email": "string",
  "password": "string",
  "number": "string",
  "platform": "PS5 | XBOX | PC",
  "positions": ["PG", "SG"],
  "registerCode": "string"
}
```

**Response 201:**
```json
{
  "id": 10,
  "email": "email@email.com"
}
```

---

### 👤 Usuário

#### GET /api/v1/users/me
Retorna dados do usuário logado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "id": 1,
  "name": "Diogo",
  "nickname": "Graciiano",
  "roles": ["ROLE_ADMIN"]
}
```

---

### 🏀 Drafts

#### GET /api/v1/drafts
Lista todos os drafts disponíveis.

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "NBA 2K26 Draft",
    "description": "Draft oficial",
    "status": "OPEN | CLOSED",
    "createdAt": "2025-12-16T10:00:00-03:00"
  }
]
```

---

#### GET /api/v1/drafts/{draftId}
Detalhe completo de um draft.

**Response 200:**
```json
{
  "id": 1,
  "title": "NBA 2K26 Draft",
  "rules": {
    "maxPlayers": 30,
    "rounds": 2
  },
  "organizer": {
    "id": 2,
    "nickname": "Admin"
  }
}
```

---

#### POST /api/v1/drafts/{draftId}/signup
Inscreve o usuário no draft.

**Request:**
```json
{
  "desiredPositions": ["PG", "SG"]
}
```

**Response 201:**
```json
{
  "id": 15,
  "status": "WAITLIST"
}
```

---

### ⏳ Waitlist

**Roles requeridas:** ROLE_ADMIN ou ROLE_ORGANIZER

#### GET /api/v1/drafts/{draftId}/waitlist
Lista jogadores na waitlist.

**Response 200:**
```json
[
  {
    "signupId": 7,
    "user": {
      "id": 5,
      "nickname": "Player01"
    },
    "desiredPositions": ["PG"],
    "assignedPosition": null,
    "status": "WAITLIST"
  }
]
```

---

#### PATCH /api/v1/drafts/{draftId}/waitlist/{signupId}
Atribui posição ao jogador.

**Request:**
```json
{
  "assignedPosition": "PG"
}
```

**Response 200:**
```json
{
  "status": "APPROVED"
}
```

---

### 🔔 WebSocket

**Endpoint:** `/ws`

**Tópicos:**
- `/topic/drafts/{draftId}`

**Eventos:**

```json
{
  "type": "WAITLIST_UPDATED | PLAYER_APPROVED",
  "payload": {}
}
```

---

## Autenticação

Todas as requisições (exceto login e register) requerem o header:

```
Authorization: Bearer <token>
```

O token é obtido no endpoint `/api/v1/auth/login`.

---

## Códigos de Status HTTP

- **200** - OK
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error
