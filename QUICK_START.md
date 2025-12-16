# 🎯 Guia de Uso Rápido - NBA 2K Draft System

## Como Usar os Principais Recursos

### 1. Toast Notifications

Exibir notificações para o usuário:

```typescript
import { useToast } from '@/components/Toast';

function MyComponent() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast('Operação realizada com sucesso!', 'success');
  };

  const handleError = () => {
    addToast('Erro ao processar', 'error');
  };

  const handleWarning = () => {
    addToast('Atenção: Verifique os dados', 'warning');
  };

  const handleInfo = () => {
    addToast('Informação importante', 'info', 3000); // 3 segundos
  };
}
```

### 2. Usar Redux com Hooks

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '@/store/auth/selector';
import { loginRequest, logout } from '@/store/auth/duck';

function MyComponent() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogin = () => {
    dispatch(loginRequest('email@test.com', 'password'));
  };

  const handleLogout = () => {
    dispatch(logout());
  };
}
```

### 3. Proteger Rotas

```typescript
import ProtectedRoute from '@/components/ProtectedRoute';

function AdminPage() {
  return (
    <ProtectedRoute requireRoles={['ROLE_ADMIN']}>
      <div>Conteúdo apenas para admins</div>
    </ProtectedRoute>
  );
}
```

### 4. Usar Styled Components

```typescript
import styled from 'styled-components';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

// Com props
const Button = styled.button<{ $primary?: boolean }>`
  background: ${({ theme, $primary }) => 
    $primary ? theme.colors.primary.main : 'transparent'
  };
`;
```

### 5. Formulários com React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        {...register('email', { required: 'Email é obrigatório' })}
        error={errors.email?.message}
      />
      <Input
        label="Senha"
        type="password"
        {...register('password', { required: 'Senha é obrigatória' })}
        error={errors.password?.message}
      />
      <Button type="submit">Entrar</Button>
    </form>
  );
}
```

### 6. Modal

```typescript
import { useState } from 'react';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Título do Modal"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => console.log('Confirmar')}>
              Confirmar
            </Button>
          </>
        }
      >
        <p>Conteúdo do modal</p>
      </Modal>
    </>
  );
}
```

### 7. Loading States

```typescript
import Skeleton from '@/components/Skeleton';
import Loading from '@/components/Loading';

function MyComponent() {
  const isLoading = true;

  if (isLoading) {
    return <Loading text="Carregando dados..." />;
  }

  // Ou usar skeleton
  return (
    <>
      <Skeleton type="title" />
      <Skeleton type="text" width="80%" />
      <Skeleton type="card" />
    </>
  );
}
```

### 8. WebSocket para Tempo Real

```typescript
import { useWebSocket } from '@/hooks/useWebSocket';

function DraftPage() {
  const draftId = 123;
  
  // Conecta automaticamente ao WebSocket
  useWebSocket(draftId);

  // Atualizações serão recebidas automaticamente via Redux
}
```

### 9. Navegação

```typescript
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function MyComponent() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/drafts');
  };

  return (
    <>
      {/* Navegação declarativa */}
      <Link href="/login">Login</Link>

      {/* Navegação programática */}
      <button onClick={handleNavigate}>Ir para Drafts</button>
    </>
  );
}
```

### 10. Acessar Tema

```typescript
import { useTheme } from 'styled-components';

function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{ color: theme.colors.primary.main }}>
      Texto colorido
    </div>
  );
}
```

### 11. Formatação de Datas

```typescript
import { formatDate, formatDateTime, timeAgo } from '@/utils/date';

function MyComponent() {
  const date = '2025-12-16T10:00:00';

  return (
    <>
      <p>{formatDate(date)}</p> {/* 16/12/2025 */}
      <p>{formatDateTime(date)}</p> {/* 16/12/2025 10:00 */}
      <p>{timeAgo(date)}</p> {/* 2 horas atrás */}
    </>
  );
}
```

### 12. Validações

```typescript
import { isValidEmail, isValidPassword } from '@/utils/validation';

function validateForm(email: string, password: string) {
  if (!isValidEmail(email)) {
    return 'Email inválido';
  }

  if (!isValidPassword(password)) {
    return 'Senha deve ter no mínimo 8 caracteres';
  }

  return null;
}
```

### 13. Constantes

```typescript
import { POSITIONS, PLATFORMS, ROLES } from '@/utils/constants';

function MyComponent() {
  return (
    <select>
      {POSITIONS.map(pos => (
        <option key={pos} value={pos}>{pos}</option>
      ))}
    </select>
  );
}
```

### 14. Criar Nova Ação Redux

```typescript
// 1. Adicionar tipo em types.ts
export const NEW_ACTION = 'module/NEW_ACTION';

// 2. Criar action creator em duck.ts
export const newAction = (payload: any) => ({
  type: NEW_ACTION,
  payload,
});

// 3. Adicionar caso no reducer
case NEW_ACTION:
  return { ...state, data: action.payload };

// 4. Criar saga se necessário
function* newActionSaga(action) {
  const response = yield call(api.getData);
  yield put(newActionSuccess(response));
}
```

### 15. Adicionar Nova Página

```typescript
// 1. Criar arquivo em app/nova-pagina/page.tsx
'use client';

export default function NovaPagina() {
  return <div>Conteúdo</div>;
}

// 2. Acessar em /nova-pagina
```

---

## Dicas de Performance

### Memoização
```typescript
import { useMemo, useCallback } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### React.memo
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

---

## Debug

### Redux DevTools
Instale a extensão Redux DevTools no navegador para debug do estado.

### Console Logs
```typescript
console.log('Debug:', data);
console.error('Erro:', error);
console.warn('Atenção:', warning);
```

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Lint
npm run lint

# Type Check
npm run type-check
```

---

## Estrutura de Um Componente Completo

```typescript
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';

// Styles
const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

// Types
interface MyComponentProps {
  title: string;
  onSave?: (data: any) => void;
}

// Component
const MyComponent: React.FC<MyComponentProps> = ({ title, onSave }) => {
  const [data, setData] = useState('');

  const handleSave = () => {
    onSave?.(data);
  };

  return (
    <Container>
      <h1>{title}</h1>
      <input value={data} onChange={(e) => setData(e.target.value)} />
      <Button onClick={handleSave}>Salvar</Button>
    </Container>
  );
};

export default MyComponent;
```

---

Pronto! Agora você tem tudo para desenvolver no projeto! 🚀
