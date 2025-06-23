## Setup

Make sure to install dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:
```bash
npm run dev
```
Start the development json-server on `http://localhost:3001`:
```bash
npm run server:start
```

## Production

Build the application for production:

```bash
npm run build
npm run start
```

## Log
### Install vitest for Nuxt 3
```bash
  npm install --save-dev @nuxt/test-utils vitest @vue/test-utils jsdom @vitejs/plugin-vue
```
### Production scripts
```bash
  sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```