document.addEventListener("DOMContentLoaded", function() {
    // 1. Captura o ID do post na URL
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");

    // 2. Busca o array de posts no Local Storage
    const posts = JSON.parse(localStorage.getItem("postsArray")) || [];

    // 3. Busca o post correspondente ao ID
    const post = posts.find(p => p.id === postId);

    // 4. Verifica se o post existe
    if (!post) {
        // Se o post não for encontrado, redireciona para a página de erro 404
        window.location.href = "pagina_erro_404.html";
    } else {
        // Se o post for encontrado, exibe as informações na página
        const postContainer = document.getElementById("post-Container");
        postContainer.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.image}" alt="${post.title}">
            <p>${post.content}</p>
        `;
    }
});

