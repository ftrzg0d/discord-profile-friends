import dotenv from 'dotenv';
import express from 'express';
import { Client, GatewayIntentBits } from 'discord.js';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

function createBanner() {
    console.log(chalk.cyan(`
    ███████╗██╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
    ██╔════╝██║   ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
    █████╗  ██║   ██║   ██║   ██║   ██║██████╔╝█████╗  
    ██╔══╝  ██║   ██║   ██║   ██║   ██║██╔══██╗██╔══╝  
    ██║     ╚██████╔╝   ██║   ╚██████╔╝██║  ██║███████╗
    ╚═╝      ╚═════╝    ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
    `));
    console.log(chalk.cyan('═══════════════════════════════════════════════════'));
    console.log(chalk.white('  Discord Status Viewer') + chalk.gray(' | ') + chalk.yellow('Desenvolvido por Future'));
    console.log(chalk.cyan('═══════════════════════════════════════════════════\n'));
}

app.set('view engine', 'ejs');
app.use(express.static('public'));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});

const discordUsers = [
    { id: '1170900226844934225' },
    { id: '1170900226844934225' },
    { id: '1170900226844934225' },
    { id: '1170900226844934225' }
];

let usersCache = new Map();

function getGameIcon(gameName) {
    
    const cleanName = gameName.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/\s+/g, '-');

    
    const gameIconMap = {
        'Visual Studio Code': 'fa-code',
        'leagueoflegends': 'fa-gamepad',
        'valorant': 'fa-crosshairs',
        'minecraft': 'fa-cube',
        'roblox': 'fa-robot',
        'fortnite': 'fa-gun',
        'counterstrike': 'fa-bullseye',
        'csgo': 'fa-bullseye',
        'gta': 'fa-car',
        'gtav': 'fa-car',
        'apexlegends': 'fa-crosshairs',
        'rocketleague': 'fa-car-side',
        'fifa': 'fa-futbol',
        'fifa24': 'fa-futbol',
        'steam': 'fa-steam',
        'epicgames': 'fa-gamepad',
        'battlenet': 'fa-gamepad',
        'origin': 'fa-gamepad'
    };

    
    const iconClass = gameIconMap[gameName] || gameIconMap[cleanName] || 'fa-gamepad';
    
    return `<i class="fas ${iconClass}"></i>`;
}

function getLanguageIcon(filename) {
    const extensions = {
        '.js': 'fab fa-js',
        '.ts': 'fab fa-js blue',
        '.py': 'fab fa-python',
        '.java': 'fab fa-java',
        '.html': 'fab fa-html5',
        '.css': 'fab fa-css3',
        '.php': 'fab fa-php',
        '.rb': 'fas fa-gem',
        '.go': 'fas fa-code blue',
        '.rs': 'fas fa-gear orange',
        '.cpp': 'fas fa-code purple',
        '.c': 'fas fa-code blue',
        '.cs': 'fas fa-code purple',
        '.jsx': 'fab fa-react',
        '.tsx': 'fab fa-react blue',
        '.vue': 'fab fa-vuejs',
        '.svelte': 'fas fa-code orange',
        '.md': 'fas fa-markdown',
        '.json': 'fas fa-brackets-curly',
        '.yml': 'fas fa-file-code',
        '.sql': 'fas fa-database'
    };

    if (!filename) return 'fas fa-code'; 

    const ext = '.' + filename.split('.').pop().toLowerCase();
    return extensions[ext] || 'fas fa-code';
}

async function updateUsersCache() {
    for (const user of discordUsers) {
        try {
            const member = await client.users.fetch(user.id);
            const presence = await client.guilds.cache
                .first()
                .members.fetch(user.id)
                .then(m => m.presence);

            const processedActivities = presence?.activities?.map(activity => {
                let imageUrl = null;
                let icon = null;

                if (activity.name === 'Visual Studio Code') {
                    const filename = activity.details || '';
                    return {
                        ...activity,
                        type: 0,
                        name: 'Visual Studio Code',
                        details: filename || 'Codando',
                        state: activity.state || 'Editando arquivo',
                        imageUrl: null,
                        icon: `<i class="${getLanguageIcon(filename)}"></i>`
                    };
                }

                if (activity.type === 2) { 
                    if (activity.assets?.largeImage) {
                        imageUrl = activity.assets.largeImage.startsWith('spotify:')
                            ? `https://i.scdn.co/image/${activity.assets.largeImage.replace('spotify:', '')}`
                            : activity.assets.largeImage;
                    } else {
                        icon = '<i class="fab fa-spotify"></i>';
                    }
                } else if (activity.type === 0) { 
                    if (activity.assets?.largeImage) {
                        imageUrl = activity.assets.largeImage.startsWith('mp:')
                            ? `https://media.discordapp.net/${activity.assets.largeImage.replace('mp:', '')}`
                            : `https://cdn.discordapp.com/app-assets/${activity.applicationId}/${activity.assets.largeImage}.png`;
                    } else {
                        icon = getGameIcon(activity.name);
                    }
                }

                return {
                    ...activity,
                    imageUrl,
                    icon
                };
            }) || [];

            usersCache.set(user.id, {
                id: user.id,
                username: member.username,
                global_name: member.globalName,
                avatar: member.avatar,
                status: presence?.status || 'offline',
                activities: processedActivities
            });
        } catch (error) {
            console.error(`Erro ao buscar usuário ${user.id}:`, error);
        }
    }
}

client.on('ready', () => {
    console.log(chalk.green('✓ ') + chalk.white('Bot Discord conectado como: ') + chalk.cyan(client.user.tag));
    console.log(chalk.green('✓ ') + chalk.white('Status: ') + chalk.green('Online'));
    console.log(chalk.cyan('─────────────────────────────────────────────────'));
    updateUsersCache();
    setInterval(updateUsersCache, 30000);
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (discordUsers.some(u => u.id === newPresence.userId)) {
        updateUsersCache();
    }
});

app.get('/', async (req, res) => {
    try {
        const users = discordUsers.map(user => usersCache.get(user.id) || {
            id: user.id,
            username: 'Carregando...',
            status: 'offline'
        });
        res.render('index', { users });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados do Discord');
    }
});

app.get('/api/users-status', (req, res) => {
    const users = discordUsers.map(user => usersCache.get(user.id));
    res.json(users);
});

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    createBanner();
    console.log(chalk.green('✓ ') + chalk.white('Servidor iniciado na porta: ') + chalk.yellow(PORT));
    console.log(chalk.green('✓ ') + chalk.white('URL Local: ') + chalk.cyan(`http://localhost:${PORT}`));
    console.log(chalk.cyan('─────────────────────────────────────────────────\n'));
});

client.login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.log(chalk.red('✗ ') + chalk.white('Erro ao conectar ao Discord: '));
        console.log(chalk.red(error));
        process.exit(1);
    });

process.on('unhandledRejection', error => {
    console.log(chalk.red('\n✗ Erro não tratado: '));
    console.log(chalk.red(error));
}); 