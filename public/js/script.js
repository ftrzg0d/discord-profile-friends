document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const container = document.querySelector('.container');
    const enterButton = document.querySelector('.enter-button');
    const loadingTitle = document.querySelector('.loading-title');
    const loadingSubtitle = document.querySelector('.loading-subtitle');
    const backgroundGrid = document.querySelector('.background-grid');

    // feito por future

    
    function updateStatus() {
        fetch('/api/users-status')
            .then(response => response.json())
            .then(users => {
                users.forEach(user => {
                    const card = document.querySelector(`[data-user-id="${user.id}"]`);
                    if (card) {
                        const statusElement = card.querySelector('.status');
                        statusElement.className = `status ${user.status}`;
                    }
                });
            })
            .catch(console.error);
    }

    
    const typeText = (element, text) => {
        const letters = text.split('');
        element.textContent = '';
        
        letters.forEach((letter, index) => {
            setTimeout(() => {
                element.textContent += letter;
            }, index * 100);
        });
    };

    
    const messages = [
        'Conectando-se aos amigos...',
        'Carregando atividades...',
        'Sincronizando dados...',
        'Quase lá...',
        'Pronto para entrar!'
    ];

    let currentMessageIndex = 0;
    let messageInterval;

    const updateLoadingMessage = () => {
        loadingSubtitle.style.opacity = '0';
        setTimeout(() => {
            loadingSubtitle.textContent = messages[currentMessageIndex];
            loadingSubtitle.style.opacity = '1';
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        }, 300);
    };

    
    setTimeout(() => {
        typeText(loadingTitle, 'Discord Friends');
        updateLoadingMessage();
        messageInterval = setInterval(updateLoadingMessage, 2000);
    }, 500);

    
    const showContent = () => {
        clearInterval(messageInterval);
        
        loadingScreen.style.transform = 'scale(1.1)';
        loadingScreen.style.opacity = '0';
        backgroundGrid.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            container.classList.remove('hidden');
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
            
            
            updateStatus();
            setInterval(updateStatus, 30000);
        }, 800);
    };

    
    const buttonGlow = enterButton.querySelector('.button-glow');
    let isEntering = false;

    enterButton.addEventListener('mousemove', (e) => {
        if (isEntering) return;
        const rect = enterButton.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        buttonGlow.style.setProperty('--x', `${x}%`);
        buttonGlow.style.setProperty('--y', `${y}%`);
    });

    
    enterButton.addEventListener('click', (e) => {
        if (isEntering) return;
        isEntering = true;
        
       
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = enterButton.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size * 2}px`;
        
        const x = e.clientX - rect.left - size;
        const y = e.clientY - rect.top - size;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        enterButton.appendChild(ripple);
        enterButton.classList.add('clicked');
        
        setTimeout(() => {
            ripple.remove();
            enterButton.classList.remove('clicked');
        }, 1000);

        showContent();
    });

    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const shine = card.querySelector('.card-shine');
        if (shine) {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                shine.style.background = `
                    radial-gradient(
                        circle at ${x}px ${y}px,
                        rgba(255, 255, 255, 0.08),
                        transparent 80%
                    )
                `;
            });
        }
    });
}); 