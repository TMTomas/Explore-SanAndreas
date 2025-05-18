window.onload = boot

const ID_ARTICLE_TITLE = "id-article-title",
ID_ARTICLE_DATE = "id-article-date",
ID_ARTICLE_AUTHOR = "id-article-author",
ID_ARTICLE_IMG = "id-article-img",
ID_ARTICLE_DESCRIPTION = "id-article-description"

var articleTitle,
    articleDate,
    articleAuthor,
    articleImg,
    articleDescription

function boot() {
    articleTitle = id(ID_ARTICLE_TITLE)
    articleDate = id(ID_ARTICLE_DATE)
    articleAuthor = id(ID_ARTICLE_AUTHOR)
    articleImg = id(ID_ARTICLE_IMG)
    articleDescription = id(ID_ARTICLE_DESCRIPTION)
}

