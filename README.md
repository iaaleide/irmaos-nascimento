# Irmãos Nascimento

Site da casa de materiais de construção **Irmãos Nascimento**, com foco na loja da Rua das Esmeraldas, 2260, em Atibaia. Compra, orçamento e rota abrem só no WhatsApp.

## Como rodar

```bash
npm install
npm run build
npm start
```

- Site: `http://127.0.0.1:43147`
- Admin: `http://127.0.0.1:43147/admin`

Senha padrão do admin: `irmaos2026`  
Troque em produção com a variável de ambiente `ADMIN_PASSWORD`.

Para desenvolvimento:

```bash
npm run dev
```

No `dev` do Vite as rotas `/api/*` precisam do `npm start` (servidor com API) ou de um proxy. Prefira `npm run build && npm start` para testar o painel.

## Painel admin

Em `/admin` você consegue:

- Ver visitas totais e do dia
- Ver cliques no WhatsApp por seção (banner, menu, produtos, formulário, flutuante, etc.)
- Editar slogan, texto de apoio, WhatsApp exibido e resumo do horário
- Zerar contadores

Os dados ficam em `.data/analytics.json` no servidor local. Na Vercel o armazenamento é temporário do runtime (pode zerar em reinícios).

## O que o site faz

- Banner com *Peça o seu orçamento na melhor casa de materiais da região* e o botão **Peça o Orçamento**
- Contadores de visita e de contato WhatsApp por segmento
- Horário com feriados nacionais, de SP e aniversário de Bragança
- Loja de Atibaia em destaque e filial em Bragança Paulista
- Formulário de orçamento que abre o WhatsApp `(11) 97500-4168`

Não há carrinho nem checkout.
