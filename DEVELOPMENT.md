# 🎮 NBA 2K Draft System - Guia de Desenvolvimento

## Estrutura de Componentes

### Atomic Design

Os componentes seguem uma organização modular:

- **Atoms**: Button, Input, Skeleton, Loading
- **Molecules**: Card, Modal
- **Organisms**: WaitlistManager
- **Templates**: Layouts de páginas
- **Pages**: Páginas completas do Next.js

## Padrão Redux Ducks

Cada módulo do Redux (auth, drafts, waitlist) contém:

1. **types.ts** - TypeScript interfaces e action types
2. **duck.ts** - Reducer + Action Creators
3. **saga.ts** - Side effects (API calls)
4. **selector.ts** - Selectors memoizados com Reselect

### Exemplo de fluxo:

```typescript
// 1. Componente dispara ação
dispatch(loginRequest(email, password));

// 2. Saga intercepta
function* loginSaga(action) {
  const response = yield call(authService.login, action.payload);
  yield put(loginSuccess(response.user, response.token));
}

// 3. Reducer atualiza estado
case AUTH_LOGIN_SUCCESS:
  return { ...state, user: action.payload.user };

// 4. Selector retorna dado
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);
```

## Styled Components

### Temas

Use sempre as variáveis do tema:

```typescript
const Button = styled.button`
  color: ${({ theme }) => theme.colors.primary.main};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
```

### Props com $

Props que não devem ser passadas para o DOM usam prefixo `$`:

```typescript
const Button = styled.button<{ $variant: string }>`
  background: ${({ $variant }) => $variant === 'primary' ? ... };
`;
```

## Hooks Customizados

### useAuth

```typescript
const { isAuthenticated, user, isLoggedIn } = useAuth();
```

### useWebSocket

```typescript
const socket = useWebSocket(draftId);
// Conecta automaticamente e escuta eventos do draft
```

### useIsMobile

```typescript
const isMobile = useIsMobile(); // true se < 768px
```

## Convenções de Código

### Nomenclatura

- **Componentes**: PascalCase (Button, Card)
- **Arquivos**: kebab-case para utils (token.ts, date.ts)
- **Pastas**: PascalCase para componentes, lowercase para outros
- **Constantes**: UPPER_SNAKE_CASE
- **Funções**: camelCase

### Organização de Imports

```typescript
// 1. React e libs externas
import React from 'react';
import { useSelector } from 'react-redux';

// 2. Componentes
import Button from '@/components/Button';

// 3. Store
import { selectUser } from '@/store/auth/selector';

// 4. Serviços e utils
import { formatDate } from '@/utils/date';

// 5. Tipos
import { User } from '@/types/api';

// 6. Estilos
import styled from 'styled-components';
```

### TypeScript

- Sempre tipar props de componentes
- Usar interfaces para objetos complexos
- Usar types para unions e primitivos
- Evitar `any`, use `unknown` se necessário

## Performance

### Memoização

```typescript
// Selectors são memoizados automaticamente
export const selectOpenDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.filter(d => d.status === 'OPEN')
);
```

### React.memo

```typescript
export default React.memo(ExpensiveComponent);
```

### useCallback e useMemo

```typescript
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

## Testes (TODO)

### Jest + React Testing Library

```typescript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Cypress (TODO)

```typescript
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[name=email]').type('test@test.com');
    cy.get('input[name=password]').type('password');
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/drafts');
  });
});
```

## Git Workflow

### Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/nome-da-feature` - Novas features
- `fix/nome-do-bug` - Correções

### Commits

Usar Conventional Commits:

```
feat: adiciona componente de notificação
fix: corrige erro no login
docs: atualiza README
style: formata código
refactor: refatora hook useAuth
test: adiciona testes para Button
chore: atualiza dependências
```

## Deploy

### Vercel (Recomendado)

1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

```bash
# Build
npm run build

# A pasta .next/ contém o build
# Configure o servidor para servir esta pasta
```

## Troubleshooting

### Erro de Hydration

Se houver erro de hydration do Next.js, verifique:
- Não usar `window` ou `localStorage` no render inicial
- Usar `useEffect` para código client-side
- Marcar componentes com `'use client'` quando necessário

### Styled Components não funciona

Certifique-se de que:
- `next.config.js` tem `compiler.styledComponents: true`
- `'use client'` está no topo do arquivo
- Provider está no layout.tsx

### Redux não atualiza

Verifique:
- Actions estão sendo despachadas corretamente
- Sagas estão registradas no rootSaga
- Reducers estão retornando novo estado (imutabilidade)

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Styled Components](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
