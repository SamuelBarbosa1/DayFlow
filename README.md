# DayFlow

DayFlow é um aplicativo de gerenciamento de tarefas minimalista e eficiente, desenvolvido com React Native, Expo e TypeScript. O objetivo do app é ajudar você a organizar seu dia, gerenciar listas de tarefas e manter notas rápidas, tudo com uma interface moderna e agradável em modo escuro.

## 🚀 Funcionalidades

- **Gerenciamento de Tarefas**: Crie, edite, exclua e marque tarefas como concluídas.
- **Planejamento Diário**: Visualize rapidamente suas tarefas de "Hoje" e "Amanhã".
- **Listas Personalizadas**: Organize suas tarefas em listas personalizadas (ex: Pessoal, Trabalho) com cores distintas.
- **Notas Rápidas**: Crie notas com cores para ideias e lembretes rápidos.
- **Prioridades**: Defina prioridade (Baixa, Média, Alta) para suas tarefas.
- **Datas de Vencimento**: Agende tarefas para hoje, amanhã ou mantenha sem data.
- **Modo Escuro**: Interface projetada nativamente em dark mode para conforto visual.
- **Internacionalização**: Totalmente em Português (pt-BR).
- **Persistência de Dados**: Seus dados são salvos localmente no dispositivo.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- **[React Native](https://reactnative.dev/)** com **[Expo](https://expo.dev/)**: Framework principal para desenvolvimento mobile.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e manutenibilidade do código.
- **[React Navigation](https://reactnavigation.org/)**: Navegação fluida entre telas (Stack e Bottom Tabs).
- **[Zustand](https://github.com/pmndrs/zustand)**: Gerenciamento de estado global simples e leve.
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)**: Armazenamento local de dados persistente.
- **[Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)**: Ícones modernos e consistentes.
- **[Date-fns](https://date-fns.org/)**: Manipulação e formatação de datas.

## 📱 Estrutura do Projeto

```
src/
├── components/   # Componentes reutilizáveis (Botões, Inputs, Items de Lista, etc)
├── screens/      # Telas da aplicação (Home, Tarefas, Notas, Adicionar/Editar)
├── navigation/   # Configuração de navegação (Abas e Pilha)
├── store/        # Gerenciamento de estado global (Zustand)
├── theme/        # Definições de tema (Cores, Tipografia, Espaçamento)
├── types/        # Definições de tipos TypeScript
├── database/     # Configuração de armazenamento local
└── hooks/        # Hooks personalizados
```

## 🏁 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- Gerenciador de pacotes (npm ou yarn).
- Aplicativo **Expo Go** instalado no seu dispositivo móvel (Android ou iOS) ou um emulador configurado.

### Instalação

1. Clone o repositório (ou baixe os arquivos):
   ```bash
   git clone <url-do-repositorio>
   cd DayFlow
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

### Executando

1. Inicie o servidor de desenvolvimento:
   ```bash
   npx expo start
   ```

2. Utilize o aplicativo **Expo Go** para escanear o QR Code gerado no terminal.
   - **Android**: Escaneie o QR Code com o app Expo Go.
   - **iOS**: Abra a câmera e escaneie o QR Code (ou abra o link no Expo Go).

## 📄 Licença

Este projeto é de uso livre para fins de aprendizado e portfólio.
