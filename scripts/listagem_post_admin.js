function loadPosts() {
  const postsTableBody = document.querySelector('#postsTable tbody');
  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  postsTableBody.innerHTML = ''; // Limpa a tabela

  if (posts.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.setAttribute('colspan', '6');
    emptyCell.textContent = 'Nenhum post encontrado.';
    emptyRow.appendChild(emptyCell);
    postsTableBody.appendChild(emptyRow);
  } else {
    posts.forEach((post, index) => {
      const row = document.createElement('tr');

      const tituloCell = document.createElement('td');
      tituloCell.textContent = post.titulo;
      row.appendChild(tituloCell);

      const descricaoCell = document.createElement('td');
      descricaoCell.textContent = post.descricao;
      row.appendChild(descricaoCell);

      const categoriaCell = document.createElement('td');
      categoriaCell.textContent = post.categoria;
      row.appendChild(categoriaCell);

      const dataCriacaoCell = document.createElement('td');
      dataCriacaoCell.textContent = new Date(
        post.dataCriacao
      ).toLocaleDateString();
      row.appendChild(dataCriacaoCell);

      const fotoCell = document.createElement('td');
      const fotoImg = document.createElement('img');
      fotoImg.setAttribute('src', post.foto);
      fotoImg.setAttribute('alt', post.titulo);
      fotoImg.style.maxWidth = '100px';
      fotoCell.appendChild(fotoImg);
      row.appendChild(fotoCell);

      const actionCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = 'Deletar';
      deleteButton.onclick = () => deletePost(index);
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      postsTableBody.appendChild(row);
    });
  }
}

function deletePost(index) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts = posts.filter((post, i) => i !== index);
  localStorage.setItem('posts', JSON.stringify(posts));
  loadPosts();
}

document.addEventListener('DOMContentLoaded', loadPosts);

function createCard({ id, titulo, dataCriacao, descricao, categoria, foto }) {
  const classes = [
    'post',
    'img-wrapper',
    'post-info',
    'poster-read',
    'poster-foot',
  ];
  const [postDiv, imgWrapperDiv, postInfo, postHeadDiv, postFootDiv] =
    createDom('div', 'div', 'div', 'div', 'div').map((div, index) => {
      div.setAttribute('class', classes[index]);
      return div;
    });

  const [headerSpan, postTitle, dateSpan, readSpan, img] = createDom(
    'span',
    'h2',
    'span',
    'span',
    'img'
  );

  imgWrapperDiv.appendChild(img);

  postHeadDiv.append(headerSpan, postTitle);
  postFootDiv.append(dateSpan, readSpan);
  postInfo.append(postHeadDiv, postFootDiv);

  postDiv.append(imgWrapperDiv, postInfo);

  const readingTime = (descricao.length * 60) / 200;
  let msg =
    readingTime < 60
      ? `${Math.ceil(readingTime)} segundos`
      : `${readingTime / 60} minutos`;

  //const msg = `${readingTime / 60}`

  img.src = foto;
  postTitle.innerText = titulo;
  headerSpan.innerText = categoria;
  dateSpan.innerText = dataCriacao;
  readSpan.innerText = `${msg} de leitura`;

  addEvent(postDiv, id);

  return postDiv;

  /*
        const divs = createDom(['div', 'div', 'div', 'div'])

        const classes = ['post', 'img-wrappe', 'poster-foot']
        
        divs.forEach( (div, index) => {
            div.setAttribute('class', classes[ index ])
        })
    */
}

function loadPosts() {
  const posts = document.getElementById('posts-view');

  const storageObj = storage.get();

  storageObj.posts.forEach(postData => {
    const card = createCard(postData);

    posts.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', loadPosts);
