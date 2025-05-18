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
    
function Article(title, imgSrc, author, body) {
    this.path = "/"+encodeURIComponent(date)+"/"+encodeURIComponent(title) 
    this.title = title
    this.date = Date.now()
    this.imgSrc = imgSrc
    this.author = author
    this.body = body
}