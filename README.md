# EnglishQuest - Aprende inglês a jogar 🎮

Uma aplicação interativa para aprender inglês jogando. Traduz frases do inglês para português em 6 níveis de dificuldade com 90 perguntas no total.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4)
![TanStack Start](https://img.shields.io/badge/TanStack%20Start-1-blue)

## Features ✨

- 🎓 6 níveis de dificuldade (Iniciante → Fluente)
- 📝 90 perguntas com tradução inglês ↔ português
- 🎯 Múltipla escolha com 6 opções por pergunta
- 📱 Responsive design (desktop, tablet, mobile)
- 🚀 SSR (Server-Side Rendering) para melhor SEO
- 🎨 UI customizada para compatibilidade com navegadores antigos
- 💰 Sistema de paywall para monetização

## Níveis 📚

| Nível | Tema | Dificuldade |
|-------|------|-----------|
| 1 | Palavras básicas | Iniciante |
| 2 | Frases curtas | Básico |
| 3 | Situações reais | Intermédio |
| 4 | Tempos verbais complexos | Avançado |
| 5 | Idiomas e expressões | Fluente |
| 6 | Estrutura completa de frases | Construções |

## Tecnologia 🛠️

- **Frontend**: React 19 + TypeScript
- **Framework**: TanStack Start (SSR/SSG)
- **Routing**: TanStack Router (file-based)
- **Styling**: Tailwind CSS 4 + Custom CSS
- **State Management**: React Hooks
- **Build**: Vite + Nitro
- **UI Components**: shadcn/ui (Radix UI)
- **Package Manager**: Bun

## Configuração & Desenvolvimento 🚀

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- Bun (recomendado) ou npm/yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/niangimario/quest-englishwin.git
cd quest-englishwin

# Instale as dependências
npm install
# ou com bun
bun install
```

### Desenvolvimento Local

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# A aplicação estará disponível em http://localhost:5173
```

### Build para Produção

```bash
# Build otimizado para produção
npm run build

# Teste o build localmente
npm run preview
```

### Linting e Formatação

```bash
# Verificar estilo de código
npm run lint

# Formatar código com Prettier
npm run format
```

## Deploy na Vercel 🌍

Esta aplicação está configurada para fazer deploy na Vercel sem problemas.

### Opção 1: Via GitHub (Recomendado)

1. Push o código para GitHub:
```bash
git add .
git commit -m "chore: configure for Vercel deployment"
git push origin main
```

2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em "New Project"
4. Selecione o repositório `quest-englishwin`
5. Vercel detectará automaticamente TanStack Start
6. Clique em "Deploy"

### Opção 2: CLI da Vercel

```bash
# Instale a CLI globalmente
npm install -g vercel

# Deploy com um comando
vercel
```

### Variáveis de Ambiente

Atualmente, não há variáveis de ambiente obrigatórias. A aplicação funciona totalmente sem configuração.

Se precisar adicionar variáveis de ambiente no futuro:
1. Crie um arquivo `.env.local` (não será feito commit)
2. Ou configure no dashboard da Vercel em Project Settings → Environment Variables

## Estrutura do Projeto 📁

```
src/
├── routes/
│   ├── __root.tsx       # Layout raiz (App shell)
│   └── index.tsx        # Página principal (Game)
├── lib/
│   ├── questions.ts     # Dados de perguntas (90 questões)
│   ├── utils.ts         # Utilitários
│   └── error-*.ts       # Tratamento de erros
├── components/
│   └── ui/              # shadcn/ui components
├── styles.css           # Estilos customizados
├── start.ts             # Entrada do servidor
└── router.tsx           # Configuração do router
```

## Fluxo do Jogo 🎮

1. **Tela de Seleção** → Escolhe um nível
2. **Tela de Perguntas** → Responde múltipla escolha
3. **Feedback** → Mostra se acertou ou errou
4. **Próxima Pergunta** → Avança para a próxima
5. **Paywall** → Oferta de acesso completo

## Monetização 💰

- **Grátis**: 3 primeiras perguntas do Nível 1
- **Premium**: Todos os 6 níveis + 90 questões
- **Preço**: R$ 27,90 (acesso vitalício)
- **Plataforma**: Hotmart

## Performance ⚡

- SSR para melhor SEO
- Build otimizado com Vite
- Lazy loading de componentes
- Code splitting automático
- Minificação de CSS/JS

## Browser Support 🌐

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Contribuição 🤝

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença 📄

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Suporte 💬

Para suporte, abra uma [issue no GitHub](https://github.com/niangimario/quest-englishwin/issues).

## Roadmap 🗺️

- [ ] Sistema de autenticação com persistência de progresso
- [ ] Leaderboard global
- [ ] Modo offline
- [ ] Múltiplos idiomas
- [ ] Certificados após completar todos os níveis
- [ ] Modo dark/light
- [ ] API de perguntas dinâmicas

---

**Desenvolvido com ❤️ para aprender inglês jogando**

[Visite o site](https://englishquest.com) | [GitHub](https://github.com/niangimario/quest-englishwin)
