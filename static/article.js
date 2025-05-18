const ID_ARTICLE_TITLE = "id-article-title",
    ID_ARTICLE_DATE = "id-article-date",
    ID_ARTICLE_AUTHOR = "id-article-author",
    ID_ARTICLE_IMG = "id-article-img",
    ID_ARTICLE_BODY = "id-article-body"

var articleTitle,
    articleDate,
    articleAuthor,
    articleImg,
    articleBody

Date.prototype.toString = function () {
    return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`
}//Date.toString()


fun

function Article(title, imgAlt, imgSrc, body) {
    // this.path = "/" + encodeURIComponent(date) + "/" + encodeURIComponent(title)
    this.id = new Date().getTime()
    this.title = title
    this.date = new Date().toString()
    this.imgAlt = imgAlt
    this.imgSrc = imgSrc
    this.body = body

    this.toString() = function () {
        let ret = ""
        ret = `<center>
                    <article>
                        <table width="50%">
                            <tbody align="left">
                                <tr>
                                    <td>
                                        <header>
                                            <h1 id="id-article-title">${this.title}</h1>
                                            <aside id="idArticleDate">
                                                ${this.date}
                                            </aside>
                                            <p id="id-article-author">Posted by: </p>
                                        </header>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                         <hr width="50%">
                        <img id="id-article-img" src="${this.imgSrc}" width="${window.innerWidth/2}" alt="${this.imgAlt}">
                        <hr width="50%">
                        <table width="50%">
                            <tbody align="justify">
                                <tr>
                                    <td>
                                        <p id="id-article-body" align="justify">${this.body.substring(0,501)}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr width="50%">
                    </article>
                </center>`
    }
}