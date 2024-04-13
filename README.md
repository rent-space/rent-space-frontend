# RentSpace

Reserve espaços e serviços para seu evento!

### Instalando

```bash
npm install
```

### Variáveis de ambiente

Copie o `.env` de exemplo e insira as chaves Google fornecidas pelos integrantes da equipe.

```bash
cp .env.example .env
```

### Executando

```bash
npm run dev
```

O site estará disponível em http://localhost:3000.

### Testando

Primeiro o site deve estar rodando.

```bash
npm run dev
```

Em seguida, basta rodar o testes do cypress.

```bash
npm run test
```

### Contribuindo

Ao criar um PR a nossa suite de testes será executada automáticamente.

Além disso, o Vercel irá gerar um Web Preview para testar
funcionalmente a nova feature.

Ao fazer merge na main um novo deploy será automáticamente feito para a URL de produção.
