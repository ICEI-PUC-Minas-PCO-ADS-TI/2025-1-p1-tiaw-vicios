document.addEventListener('DOMContentLoaded', function() {
    // Lógica para obter e persistir o userId
    const urlParams = new URLSearchParams(window.location.search);
    let currentUserId = urlParams.get('userId');

    if (currentUserId) {
        // Se o userId vier da URL, salve-o no localStorage
        localStorage.setItem('userId', currentUserId);
        console.log('global.js: userId da URL salvo no localStorage:', currentUserId);
    } else {
        // Se não vier da URL, tente obter do localStorage
        currentUserId = localStorage.getItem('userId');
        console.log('global.js: userId obtido do localStorage:', currentUserId);
    }

    // Lógica para adicionar userId aos links de navegação
    if (currentUserId) {
        const navLinks = document.querySelectorAll('a[href]');

        navLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            // console.log('global.js: Processando link:', originalHref);

            // Verifica se o link é interno e não é para index.html (login/cadastro)
            if (originalHref && !originalHref.startsWith('#') && !originalHref.startsWith('http') && originalHref !== 'index.html') {
                try {
                    const url = new URL(originalHref, window.location.origin);
                    // Adiciona o userId apenas se ainda não estiver presente
                    if (!url.searchParams.has('userId')) {
                        url.searchParams.set('userId', currentUserId);
                        link.setAttribute('href', url.pathname + url.search);
                        // console.log('global.js: Link modificado para:', link.getAttribute('href'));
                    }
                } catch (e) {
                    console.error('global.js: Erro ao processar URL:', originalHref, e);
                }
            }
        });
    }

    // Lógica do mobile search toggle (movida do nav.js)
    const searchToggle = document.getElementById('mobile-search-toggle');
    const mobileSearch = document.querySelector('.mobile-search');
    
    if (searchToggle && mobileSearch) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (mobileSearch.style.display === 'none' || mobileSearch.style.display === '') {
                mobileSearch.style.display = 'block';
                mobileSearch.querySelector('input').focus();
            } else {
                mobileSearch.style.display = 'none';
            }
        });
    }
});


