# 🏀 NBA 2K Draft System

Sistema completo de gerenciamento de drafts para NBA 2K, desenvolvido com Next.js 14, Redux Saga e WebSocket para atualizações em tempo real.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=for-the-badge&logo=typescript)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=for-the-badge&logo=redux)
![Styled Components](https://img.shields.io/badge/Styled-Components-pink?style=for-the-badge&logo=styled-components)

## 📋 Sobre o Projeto

Sistema front-end completo para gerenciamento de drafts de NBA 2K, com autenticação JWT, gerenciamento de estado com Redux Saga (padrão Ducks), design system gamer premium e atualizações em tempo real via WebSocket.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** - Login/Logout seguro com refresh automático
- 👥 **Gerenciamento de Usuários** - Cadastro com validação e roles (USER, ADMIN, ORGANIZER)
- 🎮 **Sistema de Drafts** - Listagem, detalhes e inscrição em drafts
- ⏳ **Waitlist Inteligente** - Sistema de fila de espera com aprovação de administradores
- 🔄 **Tempo Real** - Atualizações via WebSocket para eventos do draft
- 🎨 **Design Gamer Premium** - Interface dark mode com glassmorphism e animações
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile

## 🛠️ Stack Tecnológica

### Core
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **React 18** - Biblioteca UI

### Estado e Data Flow
- **Redux Toolkit** - Gerenciamento de estado
- **Redux Saga** - Middleware para side effects
- **Arquitetura Ducks** - Organização modular do Redux
- **Reselect** - Selectors memoizados

### Estilização
- **Styled Components** - CSS-in-JS
- **Framer Motion** - Animações fluidas
- **Design System Custom** - Tema inspirado em NBA/E-sports

### HTTP & Real-time
- **Axios** - Cliente HTTP com interceptors
- **Socket.io Client** - WebSocket para tempo real

### Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas

## 📁 Estrutura do Projeto

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz com providers
│   ├── page.tsx                 # Página inicial
│   ├── login/                   # Página de login
│   ├── register/                # Página de registro
│   └── drafts/                  # Páginas de drafts
│       ├── page.tsx            # Lista de drafts
│       └── [id]/               # Detalhe do draft
│           ├── page.tsx        # Página de detalhes
│           └── WaitlistManager.tsx  # Componente de gerenciamento
│
├── store/                        # Redux Store (Ducks Pattern)
│   ├── index.ts                 # Configuração da store
│   ├── auth/                    # Duck de autenticação
│   │   ├── duck.ts             # Reducer + Actions
│   │   ├── saga.ts             # Sagas
│   │   ├── selector.ts         # Selectors memoizados
│   │   └── types.ts            # TypeScript types
│   ├── drafts/                  # Duck de drafts
│   └── waitlist/                # Duck de waitlist
│
├── services/                     # Serviços de API
│   ├── api.ts                   # Configuração do Axios
│   ├── auth/                    # Serviços de autenticação
│   ├── drafts/                  # Serviços de drafts
│   └── waitlist/                # Serviços de waitlist
│
├── components/                   # Componentes reutilizáveis
│   ├── Button/                  # Botão com variantes
│   ├── Card/                    # Card glassmórfico
│   ├── Input/                   # Input, Select, TextArea
│   ├── Modal/                   # Modal com overlay
│   └── Skeleton/                # Loading skeletons
│
├── styles/                       # Sistema de estilos
│   ├── theme.ts                 # Tema (cores, fontes, etc)
│   └── GlobalStyle.ts           # Estilos globais
│
├── hooks/                        # Custom hooks
│   ├── useAuth.ts               # Hook de autenticação
│   ├── useIsMobile.ts           # Detecção de mobile
│   └── useWebSocket.ts          # Gerenciamento WebSocket
│
├── types/                        # TypeScript types
│   └── api.ts                   # Tipos da API
│
└── utils/                        # Utilitários
    └── token.ts                 # Gerenciamento de token JWT
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Backend da API rodando (veja configuração abaixo)

### Instalação

1. **Clone o repositório**
```bash
cd PROJETO
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Configuration
API_BASE_URL=http://localhost:8080
WS_URL=http://localhost:8080

# App Configuration
NEXT_PUBLIC_APP_NAME=NBA 2K Draft System
NEXT_PUBLIC_DEFAULT_LOCALE=pt
```

4. **Execute o projeto em modo desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:3000
```

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Rodar build de produção
npm start
```

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `API_BASE_URL` | URL base da API backend | `http://localhost:8080` |
| `WS_URL` | URL do servidor WebSocket | `http://localhost:8080` |
| `NEXT_PUBLIC_APP_NAME` | Nome da aplicação | `NBA 2K Draft System` |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | Idioma padrão | `pt` |

## 📡 Endpoints da API

O sistema consome os seguintes endpoints:

### Autenticação
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Registro
- `GET /api/v1/users/me` - Dados do usuário logado

### Drafts
- `GET /api/v1/drafts` - Lista todos os drafts
- `GET /api/v1/drafts/{id}` - Detalhes de um draft
- `POST /api/v1/drafts/{id}/signup` - Inscrever-se em um draft

### Waitlist (Requer ADMIN/ORGANIZER)
- `GET /api/v1/drafts/{id}/waitlist` - Lista waitlist
- `PATCH /api/v1/drafts/{id}/waitlist/{signupId}` - Atribuir posição

### WebSocket
- Endpoint: `/ws`
- Tópico: `/topic/drafts/{draftId}`
- Eventos: `WAITLIST_UPDATED`, `PLAYER_APPROVED`

## 🎨 Design System

### Paleta de Cores

```typescript
primary: '#FF6B35'      // Orange NBA
secondary: '#00D9FF'    // Cyan neon
background: '#0A0E27'   // Deep dark blue
success: '#00FF88'
error: '#FF3366'
warning: '#FFB800'
```

### Componentes Principais

- **Button** - 4 variantes (primary, secondary, outline, ghost)
- **Card** - Glassmorphic com animações
- **Input/Select** - Formulários estilizados
- **Modal** - Overlay com backdrop blur
- **Skeleton** - Loading states

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

1. Login retorna token + dados do usuário
2. Token é armazenado no `localStorage`
3. Axios interceptor adiciona token automaticamente em todas as requisições
4. Token inválido/expirado redireciona para login
5. Redux mantém estado de autenticação sincronizado

## 🔄 Redux Saga Flow

```
User Action
    ↓
Action Dispatched
    ↓
Saga Intercepts (takeLatest)
    ↓
API Call (yield call)
    ↓
Success/Failure Action (yield put)
    ↓
Reducer Updates State
    ↓
Selectors Recompute (memoized)
    ↓
Components Re-render
```

## 📱 Responsividade

Breakpoints configurados:

- **xs**: 320px (mobile small)
- **sm**: 640px (mobile)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (desktop large)
- **xxl**: 1536px (desktop xlarge)

## 🧪 Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção
npm start          # Rodar build
npm run lint       # Lint com ESLint
npm run type-check # Verificação de tipos TypeScript
```

## 🤝 Roles e Permissões

- **ROLE_USER** - Usuário comum (pode se inscrever em drafts)
- **ROLE_ORGANIZER** - Organizador (pode gerenciar waitlist)
- **ROLE_ADMIN** - Administrador (acesso total)

## 📦 Dependências Principais

```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "@reduxjs/toolkit": "^2.2.0",
  "redux-saga": "^1.3.0",
  "axios": "^1.6.0",
  "styled-components": "^6.1.0",
  "framer-motion": "^11.0.0",
  "socket.io-client": "^4.7.0",
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.0"
}
```

## 🎯 Próximos Passos / Melhorias

- [ ] Internacionalização (i18n) completa pt/en
- [ ] Testes unitários com Jest
- [ ] Testes E2E com Cypress
- [ ] PWA com service workers
- [ ] Notificações push
- [ ] Dark/Light mode toggle
- [ ] Exportação de relatórios
- [ ] Chat em tempo real

## 📄 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Autor

Desenvolvido para o sistema NBA 2K Draft

---

**Nota**: Certifique-se de que o backend está rodando antes de iniciar o front-end. Configure corretamente as variáveis de ambiente para apontar para a API.
