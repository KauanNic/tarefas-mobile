# Tarefas Mobile — Frontend

Aplicativo mobile para gerenciamento de tarefas, construído com React Native e Expo.

## Tecnologias

- React Native
- Expo SDK 54
- Expo Router 6 (file-based routing)
- Axios

## Pré-requisitos

- Node.js 18+
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Backend rodando (veja o repositório [tarefas-backend](https://github.com/KauanNic/tarefas-backend))

## Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/KauanNic/tarefas-mobile.git
cd tarefas-mobile

# Instale as dependências
npm install --legacy-peer-deps

# Inicie o projeto
npx expo start --tunnel
```

Após iniciar, escaneie o QR code com o aplicativo **Expo Go**.

## Configuração da URL da API

Antes de iniciar, abra `src/services/api.js` e ajuste o valor de `BASE_URL` de acordo com o ambiente:

| Ambiente                     | URL                           |
|------------------------------|-------------------------------|
| Emulador Android             | `http://10.0.2.2:3333`        |
| Emulador iOS / web           | `http://localhost:3333`       |
| Dispositivo físico (Wi-Fi)   | `http://<SEU_IP_LOCAL>:3333`  |

Para descobrir seu IP local: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux).

> O iPhone e o computador precisam estar na **mesma rede Wi-Fi**.

## Funcionalidades

- Listar tarefas com status visual (pendente, em andamento, concluída)
- Criar nova tarefa (título, descrição, status)
- Editar tarefa existente
- Excluir tarefa com confirmação
- Pull-to-refresh na listagem

## Estrutura do projeto

```
tarefas-mobile/
├── app/
│   ├── _layout.js      # Layout raiz com navegação
│   ├── index.js        # Tela de listagem
│   └── form.js         # Tela de criação/edição
├── src/
│   ├── components/
│   │   └── TaskCard.js # Card de tarefa reutilizável
│   └── services/
│       └── api.js      # Cliente HTTP (axios) — ajuste BASE_URL aqui
└── app.json
```
