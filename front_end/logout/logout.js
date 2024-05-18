function handleLogout() {
    // Remove o token JWT do localStorage
    localStorage.removeItem('jwt');
  
    // Redireciona para a página de login
    window.location.href = '../login/login.html';
  }
  
  // Adicione o event listener ao botão de logout usando a função handleLogout
  document.getElementById('logoutButton').addEventListener('click', handleLogout);
