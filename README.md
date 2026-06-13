# Tasks Mobile — Frontend

Aplicativo mobile para gerenciamento de tarefas, construído com React Native e Expo.

## Tecnologias

- React Native
- Expo (SDK 51)
- Expo Router (file-based routing)
- Axios

## Pré-requisitos

- Node.js 18+
- Expo Go instalado no celular **ou** emulador Android/iOS configurado
- Backend rodando (veja o repositório do backend)

## Instalação e execução

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd mobile

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

Após iniciar, escaneie o QR code com o aplicativo **Expo Go** (Android/iOS).

### Configuração da URL da API

Abra `src/services/api.js` e ajuste `BASE_URL`:

| Ambiente                          | URL                           |
|-----------------------------------|-------------------------------|
| Emulador Android                  | `http://10.0.2.2:3333`        |
| Emulador iOS / Expo Go (web)      | `http://localhost:3333`       |
| Dispositivo físico                | `http://<SEU_IP_LOCAL>:3333`  |

Para descobrir seu IP local: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux).

## Funcionalidades

- Listar tarefas com status visual (pendente, em andamento, concluída)
- Criar nova tarefa (título, descrição, status)
- Editar tarefa existente
- Excluir tarefa com confirmação
- Pull-to-refresh na listagem

## Estrutura do projeto

```
mobile/
├── app/
│   ├── _layout.js      # Layout raiz com navegação
│   ├── index.js        # Tela de listagem
│   └── form.js         # Tela de criação/edição
├── src/
│   ├── components/
│   │   └── TaskCard.js # Card de tarefa reutilizável
│   └── services/
│       └── api.js      # Cliente HTTP (axios)
└── app.json
```
