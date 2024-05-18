document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('jwt');
    if (!token) {
        window.location.href = '../login/login.html'; // Redirecionar para a página de login se não houver token
    }
});
