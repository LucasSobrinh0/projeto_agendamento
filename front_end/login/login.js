document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) throw new Error('Falha na autenticação');
        return response.json();
    })
    .then(data => {
        localStorage.setItem('jwt', data.access); // Armazenar o token no localStorage
        window.location.href = '../index/index.html'; // Redirecionar para a página inicial
    })
    .catch(error => {
        console.error('Erro de autenticação:', error);
        alert('Login falhou!');
    });
});
