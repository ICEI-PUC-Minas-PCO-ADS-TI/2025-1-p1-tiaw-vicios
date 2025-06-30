document.addEventListener('DOMContentLoaded', function() {
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

    // Lógica para adicionar userId aos links de navegação
    const userId = localStorage.getItem('userId');
    console.log('nav.js: userId do localStorage:', userId);

    if (userId) {
        const navLinks = document.querySelectorAll('a[href]');

        navLinks.forEach(link => {
            const originalHref = link.getAttribute('href');
            console.log('nav.js: Processando link:', originalHref);

            // Verifica se o link é interno e não é para index.html (login/cadastro)
            // Adiciona um bloco try-catch para lidar com URLs inválidas
            if (originalHref && !originalHref.startsWith('#') && !originalHref.startsWith('http') && originalHref !== 'index.html') {
                try {
                    const url = new URL(originalHref, window.location.origin);
                    // Adiciona o userId apenas se ainda não estiver presente
                    if (!url.searchParams.has('userId')) {
                        url.searchParams.set('userId', userId);
                        link.setAttribute('href', url.pathname + url.search);
                        console.log('nav.js: Link modificado para:', link.getAttribute('href'));
                    } else {
                        console.log('nav.js: Link já contém userId:', originalHref);
                    }
                } catch (e) {
                    console.error('nav.js: Erro ao processar URL:', originalHref, e);
                    // Este link será ignorado, pois não é uma URL válida para modificação
                }
            } else {
                console.log('nav.js: Link ignorado (externo, âncora ou index.html):', originalHref);
            }
        });
    }
});


