const storage = {
    get: () => JSON.parse(localStorage.getItem('dataPets')) || { users:[], posts:[] },
    set: (storage) => localStorage.setItem('dataPets', JSON.stringify(storage)) 
}

//exemplo de uso
  
  // pegar o storage
  const s = storage.get()
  console.log( s ) // mostra um objeto com uma lista de usuarios e de posts

  // adicionar um usuário
  s.users.push( /*data do usuario*/ )

  // adiocionar um post
  s.posts.push( /*post*/ )

  //salvar storage
  storage.set( s )