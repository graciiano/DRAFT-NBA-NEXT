# 🚀 Guia de Instalação Rápida

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Backend da API rodando

## Passos

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Ambiente

Crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=NBA 2K Draft System
NEXT_PUBLIC_DEFAULT_LOCALE=pt
```

### 3. Rodar o Projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## Problemas Comuns

### Erro de TypeScript

```bash
npm run type-check
```

### Erro de Styled Components

Certifique-se de que o `next.config.js` tem:

```js
compiler: {
  styledComponents: true,
}
```

### API não conecta

Verifique se o backend está rodando e se a URL em `.env.local` está correta.

## Build de Produção

```bash
npm run build
npm start
```
