function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        window.location.href = '../login/login.html'; // Redireciona se não houver token
        return Promise.reject('No JWT token found');
    }

    // Adicionar o header Authorization com o token JWT em todas as requisições
    options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    return fetch(url, options);
}