const PostFilter = {
    author: "",
    order: "desc",
    toQueryString() {
        const params = new URLSearchParams()
        if (this.author) params.append("author", this.author)
        if (this.order) params.append("order", this.order)
        return params.toString()
    }
}
const PostView = {
    toHtml: function (post) {
        let media = ""
        if (post.media_filename) {
            if (post.media_type === "image") {
                media = `
                    <figure>
                        <img src="/static/uploads/${post.media_filename}" alt="Image for post ${post.title}">
                        <figcaption>Media for "${post.title}"</figcaption>
                    </figure>`
            } else if (post.media_type === "video") {
                media = `
                    <figure>
                        <video controls width="300">
                            <source src="/static/uploads/${post.media_filename}">
                            Your browser does not support the video tag.
                        </video>
                        <figcaption>Media for "${post.title}"</figcaption>
                    </figure>`
            }
        }

        return `
            <article>
                <header>
                    <h2>${post.title}</h2>
                    <p>By ${post.username} <time datetime="${post.created}">${post.created}</time></p>
                    ${post.is_owner ? `<a href="/${post.id}/update">Edit</a>` : ""}
                </header>
                ${media}
                <p>${post.body}</p>
            </article>`
    }
}