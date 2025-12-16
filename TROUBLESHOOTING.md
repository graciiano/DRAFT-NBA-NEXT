# 🔧 Troubleshooting - Soluções para Problemas Comuns

## Problemas de Instalação

### Erro: npm ERR! code ERESOLVE

**Solução:**
```bash
npm install --legacy-peer-deps
```

### Erro: Node version incompatible

**Solução:**
```bash
# Verifique a versão do Node
node -v

# Deve ser 18 ou superior
# Instale a versão correta ou use nvm:
nvm install 18
nvm use 18
```

---

## Problemas de Build

### Erro: Module not found

**Solução:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules
rm package-lock.json
npm install
```

### Erro: TypeScript compilation failed

**Solução:**
```bash
# Verifique os erros
npm run type-check

# Se houver muitos erros, adicione temporariamente no tsconfig.json:
"skipLibCheck": true
```

---

## Problemas de Styled Components

### Erro: Warning: Prop `className` did not match

**Causa:** Hydration mismatch entre server e client

**Solução 1:**
Adicione no topo do arquivo:
```typescript
'use client';
```

**Solução 2:**
Verifique se `next.config.js` tem:
```javascript
compiler: {
  styledComponents: true,
}
```

### Estilos não aplicam

**Solução:**
```typescript
// Use prefixo $ em props que não devem ir para o DOM
const Button = styled.button<{ $variant: string }>`
  color: ${({ $variant }) => $variant};
`;

// Uso:
<Button $variant="primary" />
```

---

## Problemas de Redux

### Actions não disparam

**Checklist:**
1. ✅ Saga está registrada no rootSaga?
2. ✅ Action type está correto?
3. ✅ Dispatch está sendo chamado?

```typescript
// Verifique no Redux DevTools se a action foi despachada
```

### Estado não atualiza

**Causa:** Mutação direta do estado

**Erro:**
```typescript
state.user.name = 'Novo nome'; // ERRADO
```

**Correto:**
```typescript
return {
  ...state,
  user: {
    ...state.user,
    name: 'Novo nome'
  }
};
```

### Selector não recomputa

**Solução:**
Use `createSelector` do Reselect:
```typescript
export const selectFilteredData = createSelector(
  [selectData, selectFilter],
  (data, filter) => data.filter(item => item.type === filter)
);
```

---

## Problemas de Autenticação

### Token não persiste

**Solução:**
```typescript
// Verifique se está salvando corretamente
tokenStorage.set(token);

// Verifique se está lendo no useEffect
useEffect(() => {
  const token = tokenStorage.get();
  if (token) {
    dispatch(restoreSession(token));
  }
}, []);
```

### Redirect loop infinito

**Causa:** Proteção de rota com lógica incorreta

**Solução:**
```typescript
useEffect(() => {
  if (!isAuthenticated && requireAuth) {
    router.push('/login');
  }
}, [isAuthenticated]); // Adicione dependências corretas
```

### API retorna 401

**Checklist:**
1. ✅ Token está sendo enviado no header?
2. ✅ Token é válido?
3. ✅ Backend está aceitando o token?

```typescript
// Debug: Veja o header no DevTools > Network
Authorization: Bearer <token>
```

---

## Problemas de API

### CORS Error

**Solução Backend:**
```java
// Configure CORS no backend
@CrossOrigin(origins = "http://localhost:3000")
```

**Solução Temporária:**
```javascript
// next.config.js
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/api/:path*',
    },
  ];
}
```

### Connection Refused

**Checklist:**
1. ✅ Backend está rodando?
2. ✅ URL está correta no `.env.local`?
3. ✅ Porta está correta?

```bash
# Teste a API manualmente
curl http://localhost:8080/api/v1/drafts
```

### Request Timeout

**Solução:**
```typescript
// Aumente o timeout no axios
const api = axios.create({
  timeout: 30000, // 30 segundos
});
```

---

## Problemas de WebSocket

### WebSocket não conecta

**Checklist:**
1. ✅ Backend WebSocket está rodando?
2. ✅ URL está correta?
3. ✅ Path `/ws` está correto?

**Debug:**
```typescript
const socket = io('http://localhost:8080', {
  path: '/ws',
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('✅ WebSocket conectado!');
});

socket.on('connect_error', (error) => {
  console.error('❌ Erro:', error);
});
```

### Eventos não chegam

**Solução:**
```typescript
// Verifique se está inscrito no tópico correto
socket.emit('subscribe', `/topic/drafts/${draftId}`);

// Escute o evento
socket.on(`/topic/drafts/${draftId}`, (message) => {
  console.log('Mensagem recebida:', message);
});
```

---

## Problemas de Performance

### Página lenta

**Soluções:**
1. Use React.memo em componentes pesados
2. Use useMemo para cálculos caros
3. Use useCallback para funções
4. Lazy load componentes pesados

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Loading />,
});
```

### Muitos re-renders

**Causa:** Dependências incorretas no useEffect

**Solução:**
```typescript
// Errado - re-render a cada mudança de objeto
useEffect(() => {
  fetchData(filter);
}, [filter]); // filter é um objeto

// Correto - use valores primitivos
useEffect(() => {
  fetchData(filter);
}, [filter.id, filter.type]);
```

---

## Problemas de UI

### Layout quebrado no mobile

**Solução:**
```typescript
// Use breakpoints do tema
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
```

### Animações travadas

**Solução:**
```typescript
// Use transform em vez de left/top
const Box = styled.div`
  /* Errado */
  left: 100px;

  /* Correto */
  transform: translateX(100px);
`;
```

### Modal não fecha com ESC

**Solução:**
```typescript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [onClose]);
```

---

## Problemas de Desenvolvimento

### Hot Reload não funciona

**Solução:**
```bash
# Reinicie o servidor
npm run dev

# Se não resolver, limpe o cache
rm -rf .next
npm run dev
```

### Mudanças não aparecem

**Solução:**
1. Hard refresh: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
2. Limpe o cache do navegador
3. Reinicie o servidor

---

## Problemas de Produção

### Build falha

**Solução:**
```bash
# Rode o build localmente primeiro
npm run build

# Veja os erros
npm run type-check
npm run lint
```

### App lento em produção

**Checklist:**
1. ✅ Está usando build de produção?
2. ✅ Imagens estão otimizadas?
3. ✅ Componentes desnecessários removidos?
4. ✅ Bundle está muito grande?

```bash
# Analise o bundle
npm run build
# Veja o tamanho dos chunks
```

---

## Debug Tools

### Redux DevTools

Instale a extensão: [Redux DevTools](https://github.com/reduxjs/redux-devtools)

### React DevTools

Instale a extensão: [React DevTools](https://react.dev/learn/react-developer-tools)

### Network Tab

Use o DevTools > Network para:
- Ver requests
- Verificar headers
- Ver payloads
- Ver respostas

### Console

```typescript
console.log('Normal');
console.error('Erro');
console.warn('Aviso');
console.table(arrayDeObjetos);
console.group('Grupo');
console.groupEnd();
```

---

## Comandos de Debug

```bash
# Limpar tudo
rm -rf node_modules .next
npm install
npm run dev

# Ver versões
node -v
npm -v

# Ver pacotes instalados
npm list

# Ver pacotes desatualizados
npm outdated

# Atualizar pacotes
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix
```

---

## Quando Pedir Ajuda

Se nada funcionar:

1. ✅ Verifique o console do navegador
2. ✅ Verifique o terminal (erros de build)
3. ✅ Verifique o Redux DevTools
4. ✅ Verifique o Network tab
5. ✅ Leia a mensagem de erro completa
6. ✅ Busque no Google/Stack Overflow
7. ✅ Verifique a documentação oficial

**Informações para incluir ao pedir ajuda:**
- Mensagem de erro completa
- Versão do Node
- O que você tentou fazer
- O que esperava acontecer
- O que realmente aconteceu
- Stack trace (se houver)

---

## Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Styled Components Docs](https://styled-components.com/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Stack Overflow](https://stackoverflow.com/)

---

Lembre-se: A maioria dos problemas tem solução simples. Leia as mensagens de erro com atenção! 🔍
