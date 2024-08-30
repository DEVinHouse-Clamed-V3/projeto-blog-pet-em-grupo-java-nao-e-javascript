// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Recupera os usuários do localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se o usuário existe
    const user = users.find(user => user.email === username && user.password === password);

    if (user) {
        // Redireciona para a tela "Home"
        window.location.href = 'listagem.html';
    } else {
        // Exibe mensagem de erro
        errorMessage.textContent = 'Usuário ou senha incorretos.';
    }
});
document.getElementById('password').addEventListener('paste', function(event) {
    let pasteContent = (event.clipboardData || window.clipboardData).getData('text');
    let passwordField = event.target;
    passwordField.value = pasteContent + pasteContent;
    event.preventDefault();
});