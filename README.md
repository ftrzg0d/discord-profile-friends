# Discord Profile Friends
### Desenvolvido por Future 🌟

<div align="center">
  <img src="preview.png" alt="Preview do Projeto" width="800px">
</div>

Um elegante visualizador de status do Discord que exibe em tempo real as atividades dos seus amigos, incluindo músicas do Spotify, jogos e atividades do VS Code, com uma interface moderna e animada.

## 🌟 Preview
[Ver Demo](https://imgur.com/AxdzwRM)

## ⚡ Funcionalidades

- 🎮 Status em tempo real dos usuários
- 🎵 Integração com Spotify (música atual)
- 💻 Detecção de atividades do VS Code com ícones por linguagem
- 🎨 Interface moderna com efeitos de vidro (glassmorphism)
- ✨ Animações e transições suaves
- 🌈 Cards dinâmicos e interativos
- 🔄 Atualização automática dos status

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Discord.js
- EJS (Template Engine)
- CSS3 (Animações e Efeitos Modernos)
- JavaScript (Vanilla)

## 📋 Pré-requisitos

- Node.js (versão 16.x ou superior)
- NPM (Node Package Manager)
- Token de Bot do Discord

# Dependências principais
npm install express         # Framework web
npm install discord.js     # API do Discord
npm install dotenv         # Variáveis de ambiente
npm install ejs           # Template engine
npm install chalk         # Colorização do console

# ou instale tudo de uma vez:
npm install express discord.js dotenv ejs chalk

## ⚙️ Configuração

1. **Clone o repositório**




## ⚙️ Configuração do Bot Discord

1. Crie um aplicativo em [Discord Developer Portal](https://discord.com/developers/applications)
2. Gere um token de bot
3. Ative as seguintes intents:
   - PRESENCE INTENT
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT

## 🎨 Personalização

- **Background**: Substitua `future.mp4` em `public/videos/` por seu próprio vídeo de fundo
- **Estilos**: Modifique `style.css` para personalizar cores e efeitos
- **Layout**: Ajuste `index.ejs` para modificar a estrutura
- **Animações**: Customize `script.js` para alterar as animações

## 📝 Notas Importantes

- O bot precisa estar no mesmo servidor que os usuários monitorados
- Mantenha seu token do Discord seguro
- Recomendado usar um vídeo de fundo otimizado (<5MB)

## 🚀 Como Executar

1. **Inicie o bot e o servidor utilizando o comando `node index.js`**
2. **Acesse a página no navegador utilizando o comando `http://localhost:1337`**


## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas features
- Enviar pull requests

## 👤 Autor

**Future**
- GitHub: [@future](https://github.com/ftrzg0d)
- Discord: @nowstealer

## 📄 Licença

Este projeto está sob a licença MIT

---

### 🌟 Desenvolvido com 💜 por Future

Se este projeto ajudou você, deixe uma ⭐️!
