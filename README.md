# Tarefas - Mobile

Aplicativo de gerenciamento de tarefas feito com React Native e Expo.

## Tecnologias usadas

- React Native
- Expo SDK 54
- Expo Router
- Axios

## Como rodar

Primeiro, certifique que o backend está rodando.

```bash
git clone https://github.com/KauanNic/tarefas-mobile.git
cd tarefas-mobile
npm install --legacy-peer-deps
npx expo start --tunnel
```

Depois é só escanear o QR code com o Expo Go no celular.

## Configurar a URL da API

Antes de rodar, abra o arquivo `src/services/api.js` e troque o `BASE_URL` pelo IP da sua máquina:

```js
const BASE_URL = 'http://SEU_IP_AQUI:3333';
```

Para descobrir o IP: `ipconfig` no Windows ou `ifconfig` no Mac/Linux.

> O celular e o computador precisam estar na mesma rede Wi-Fi.

## Funcionalidades

- Listar tarefas
- Criar tarefa
- Editar tarefa
- Excluir tarefa (com confirmação)
- Atualizar a lista puxando a tela pra baixo

## Estrutura

```
app/
├── _layout.js
├── index.js       (tela de listagem)
└── form.js        (criar e editar)
src/
├── components/TaskCard.js
└── services/api.js
```
