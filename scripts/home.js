const storage = {
    get: () => {
        const storageObj = {
            users: JSON.parse(localStorage.getItem('users')) || [],
            posts: JSON.parse(localStorage.getItem('posts')) || []
        }

        return storageObj
    },

    set: ( storageObj ) => {
        
        localStorage.setItem('posts', JSON.stringify( storageObj.posts ))
        localStorage.setItem('users', JSON.stringify( storageObj.users ))

    }
}

function createDom( ...domNames ){
    console.log(domNames)
    const a = domNames.map( name => 
        document.createElement( name )
    )

    return a
}

function cardActivation( id ){
    const newUrl = `./post.html?id=${id}`
    window.location.href = newUrl
}

function addEvent( targ, id ){
    targ.addEventListener('dblclick', () => {
        cardActivation( id )
    })

}

function createCard({ id, titulo, dataCriacao, descricao, categoria, foto }){

    const classes = ['post', 'img-wrapper', 'post-info', 'poster-read','poster-foot']
    const [
        postDiv,
        imgWrapperDiv,
        postInfo,
        postHeadDiv,
        postFootDiv
    ] = createDom('div', 'div', 'div', 'div', 'div').map( (div, index) => {
        div.setAttribute('class', classes[ index ])
        return div
    })

    const [
        headerSpan,
        postTitle,
        dateSpan,
        readSpan,
        img
    ] = createDom('span', 'h2', 'span', 'span', 'img')

    
    imgWrapperDiv.appendChild( img )

    postHeadDiv.append(headerSpan, postTitle)
    postFootDiv.append( dateSpan, readSpan )
    postInfo.append( postHeadDiv, postFootDiv )

    postDiv.append( imgWrapperDiv, postInfo )
    
    
    const readingTime = descricao.length * 60 / 200
    let msg = readingTime < 60 ? `${Math.ceil(readingTime)} segundos`: `${readingTime / 60} minutos`

    //const msg = `${readingTime / 60}`

    img.src = foto
    postTitle.innerText = titulo    
    headerSpan.innerText = categoria
    dateSpan.innerText = dataCriacao
    readSpan.innerText = `${msg} de leitura`

    addEvent(postDiv, id)

    return postDiv

    /*
        const divs = createDom(['div', 'div', 'div', 'div'])

        const classes = ['post', 'img-wrappe', 'poster-foot']
        
        divs.forEach( (div, index) => {
            div.setAttribute('class', classes[ index ])
        })
    */
}

function loadPosts(){
    const posts = document.getElementById('posts-view')

    const storageObj = storage.get()

    storageObj.posts.forEach( postData => {
        
        const card = createCard( postData )

        posts.appendChild( card )
    })

}

document.addEventListener('DOMContentLoaded', loadPosts)
