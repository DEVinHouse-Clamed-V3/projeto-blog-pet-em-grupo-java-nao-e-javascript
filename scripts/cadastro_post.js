function cadastrarPost(event) {
  event.preventDefault();

  const post = {
    id: Date.now(),
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    dataCriacao: new Date().toLocaleDateString(),
    senha: document.getElementById('senha').value,
    descricao: document.getElementById('descricao').value,
    foto: document.getElementById('foto').value,
  };

  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));

  alert('Post salvo com sucesso!');
  document.getElementById('postForm').reset();
}

document.getElementById('postForm').addEventListener('submit', cadastrarPost);

// function cadastrarUsuario(event) {
//   event.preventDefault();

//   let confirmaSenha = document.getElementById('confirma-senha').value;

//   const usuario = {
//     id: Date.now(),
//     nome: document.getElementById('nome').value,
//     email: document.getElementById('email').value,
//     dataCriacao: new Date().toLocaleDateString(),
//     senha: document.getElementById('senha').value,
//     descricao: document.getElementById('descricao').value,
//     foto: document.getElementById('foto').value,
//   };

//   if (usuario.foto === '') {
//     document.getElementById('foto').style.borderWidth = '2px';
//     document.getElementById('foto').style.borderColor = 'red';
//     document.getElementById('error-foto').innerText =
//       'Foto do usuario é obrigatória';
//     document.getElementById('error-foto').style.color = 'red';
//     console.log('precisa de foto');
//   } else {
//     document.getElementById('foto').style.border = '';
//     document.getElementById('error-foto').innerText = '';
//     document.getElementById('error-foto').style.color = '';
//   }

//   if (usuario.nome === '') {
//     // alert("Nome é obrigatório")
//     document.getElementById('nome').style.borderColor = 'red';
//     document.getElementById('nome').style.borderWidth = '2px';
//     document.getElementById('error-nome').innerText = 'Nome é obrigatório';
//     document.getElementById('error-nome').style.color = 'red';
//   } else {
//     document.getElementById('nome').style.borderColor = '';
//     document.getElementById('error-nome').innerText = '';
//     document.getElementById('error-nome').style.color = '';
//   }

//   if (usuario.email === '') {
//     // alert("Nome é obrigatório")
//     document.getElementById('email').style.borderColor = 'red';
//     document.getElementById('email').style.borderWidth = '2px';
//     document.getElementById('error-email').innerText = 'Email é obrigatório';
//     document.getElementById('error-email').style.color = 'red';
//   } else {
//     document.getElementById('email').style.borderColor = '';
//     document.getElementById('error-email').innerText = '';
//     document.getElementById('error-email').style.color = '';
//   }

//   if (usuario.senha === '') {
//     // alert("Nome é obrigatório")
//     document.getElementById('senha').style.borderColor = 'red';
//     document.getElementById('senha').style.borderWidth = '2px';
//     document.getElementById('error-senha').innerText = 'Senha é obrigatório';
//     document.getElementById('error-senha').style.color = 'red';
//   } else {
//     document.getElementById('senha').style.borderColor = '';
//     document.getElementById('error-senha').innerText = '';
//     document.getElementById('error-senha').style.color = '';
//   }

//   if (confirmaSenha === '') {
//     // alert("Nome é obrigatório")
//     document.getElementById('confirma-senha').style.borderColor = 'red';
//     document.getElementById('confirma-senha').style.borderWidth = '2px';
//     document.getElementById('error-confirma-senha').innerText =
//       'Confirma a senha é obrigatório';
//     document.getElementById('error-confirma-senha').style.color = 'red';
//   } else {
//     document.getElementById('confirma-senha').style.borderColor = '';
//     document.getElementById('error-confirma-senha').innerText = '';
//     document.getElementById('error-confirma-senha').style.color = '';
//   }

//   if (usuario.descricao === '') {
//     // alert("Nome é obrigatório")
//     document.getElementById('descricao').style.borderColor = 'red';
//     document.getElementById('descricao').style.borderWidth = '2px';
//     document.getElementById('error-descricao').innerText =
//       'Biografia do usuario  é obrigatório';
//     document.getElementById('error-descricao').style.color = 'red';
//   } else {
//     document.getElementById('descricao').style.borderColor = '';
//     document.getElementById('error-descricao').innerText = '';
//     document.getElementById('error-descricao').style.color = '';
//   }

//   if (
//     usuario.nome &&
//     usuario.foto &&
//     usuario.senha &&
//     confirmaSenha &&
//     usuario.descricao &&
//     usuario.email
//   ) {
//     if (usuario.senha !== confirmaSenha) {
//       alert('Senha errada, digite novamente');
//     } else {
//       let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
//       usuarios.push(usuario);
//       localStorage.setItem('usuarios', JSON.stringify(usuarios));

//       alert('Usuarios salvo com sucesso!');
//       document.getElementById('postForm').reset();
//       document.getElementById('foto-usuario').setAttribute('src', '');
//     }
//   }
// }

// document.getElementById('foto').addEventListener('blur', function (event) {
//   // event.target.value
//   document.getElementById('foto-usuario').setAttribute('src', this.value);
// });

// document
//   .getElementById('postForm')
//   .addEventListener('submit', cadastrarUsuario);

function setError(element, message) {
  element.style.borderColor = 'red';
  element.style.borderWidth = '2px';
  const errorElement = document.getElementById(`error-${element.id}`);
  errorElement.innerText = message;
  errorElement.style.color = 'red';
}

function clearError(element) {
  element.style.borderColor = '';
  const errorElement = document.getElementById(`error-${element.id}`);
  errorElement.innerText = '';
  errorElement.style.color = '';
}

function validateField(field) {
  if (field.value === '') {
    setError(field, `${field.name} é obrigatório`);
    return false;
  } else {
    clearError(field);
    return true;
  }
}

function cadastrarUsuario(event) {
  event.preventDefault();

  const fields = [
    'nome',
    'email',
    'senha',
    'confirma-senha',
    'descricao',
    'foto',
  ].map(id => document.getElementById(id));
  const allFieldsValid = fields.every(validateField);

  if (allFieldsValid) {
    const [nome, email, senha, confirmaSenha, descricao, foto] = fields;

    if (senha.value !== confirmaSenha.value) {
      alert('As senhas não correspondem');
      setError(confirmaSenha, 'As senhas não correspondem');
    } else {
      const usuario = {
        id: Date.now(),
        nome: nome.value,
        email: email.value,
        dataCriacao: new Date().toLocaleDateString(),
        senha: senha.value,
        descricao: descricao.value,
        foto: foto.value,
      };

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('Usuário salvo com sucesso!');
      document.getElementById('postForm').reset();
      document.getElementById('foto-usuario').setAttribute('src', '');
    }
  }
}

document.getElementById('foto').addEventListener('blur', function () {
  document.getElementById('foto-usuario').setAttribute('src', this.value);
});

document
  .getElementById('postForm')
  .addEventListener('submit', cadastrarUsuario);
