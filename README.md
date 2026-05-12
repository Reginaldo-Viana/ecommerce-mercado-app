# MercadoApp

E-commerce Angular inspirado no Mercado Livre, com Angular Material, 50 produtos mock e deploy automático no GitHub Pages.

## Funcionalidades

- Home com banner, categorias e produtos em destaque
- Listagem de produtos com filtros por categoria, preço e frete grátis
- Busca por nome/descrição
- Detalhe do produto com galeria de imagens e especificações técnicas
- Carrinho de compras reativo com Angular Signals
- Fluxo de compra com confirmação de pedido
- Design responsivo (mobile-first)

## Tecnologias

- Angular 21 (standalone components, signals)
- Angular Material
- Angular Router com hash location (GitHub Pages)
- TypeScript

## Rodar localmente

```bash
npm install
npm start
```

Acesse: `http://localhost:4200`

## Deploy no GitHub Pages

### 1. Criar repositório no GitHub

```bash
git init
git add .
git commit -m "feat: initial MercadoApp project"
git remote add origin https://github.com/SEU_USUARIO/ecommerce-mercado-app.git
git push -u origin main
```

### 2. Ativar GitHub Pages

1. Vá em **Settings > Pages** do repositório
2. Em **Source**, selecione **GitHub Actions**
3. O workflow em `.github/workflows/deploy.yml` fará o deploy automaticamente

### 3. Acessar o app

Após o deploy (aprox. 2-3 min): `https://SEU_USUARIO.github.io/ecommerce-digital/`

## Build de produção

```bash
npm run build -- --base-href=/ecommerce-mercado-app/
```
# ecommerce-mercado-app
