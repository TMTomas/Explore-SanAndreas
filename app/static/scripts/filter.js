// posts.js

const ID_AUTOR = "idAuthor",
ID_ORDEM = "idOrder",
ID_LISTA_POSTS = "idPostList"

var author,
order,
postList

function Post(p) {
    this.title = p.title
    this.author = p.author
    this.date = new Date(p.date)
    this.content = p.content
    this.media_url = p.media_url
    this.media_type = p.media_type
    
    this.toHTML = function () {
        let media = ""
        if (this.media_type === "image") {
            media = `<img src="${this.media_url}" alt="imagem">`
        } else if (this.media_type === "video") {
            media = `<video controls src="${this.media_url}"></video>`
        }
        return `<article>
        <h2>${this.title}</h2>
        <p><strong>${this.author}</strong> – ${this.date.toLocaleDateString()}</p>
        ${media}
        <p>${this.content}</p>
        </article><hr>`
    }
}

window.onload = boot

function boot() {
    author = id(ID_AUTOR)
    order = id(ID_ORDEM)
    postList = id(ID_LISTA_POSTS)

    var col = [author, order, postList]
    var ok = col.every(e => e !== null)
    if (!ok) {
        window.alert("Erro ao carregar elementos do DOM.")
        return
    }

    // Carregamento inicial
    filtrarOrdenar()
}

function filtrarOrdenar() {
    const autor = author.value.trim()
    const ordem = order.value

    fetch(`/posts/filter?autor=${encodeURIComponent(autor)}&ordem=${ordem}`)
        .then(r => r.json())
        .then(colPosts => {
            postList.innerHTML = ""
            for (let p of colPosts) {
                const post = new Post(p)
                postList.innerHTML += post.toHTML()
            }
        })
        .catch(() => {
            postList.innerHTML = "<p>Erro ao carregar posts.</p>"
        })
}
