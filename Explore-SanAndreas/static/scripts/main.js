const ID_AUTHOR = "idAuthor",
    ID_ORDER = "idOrder",
    ID_SECTION_POSTS = "idSectionPosts"

const ID_BTN_DARK_TOGGLE = 'idBtnDarkToggle',
    DARK_MODE_CLASS = 'dark-mode'

const ID_BODY = 'idBody'

let authorSelect, orderSelect, postSection
let body, btnDarkToggle, darkModeClass
let txtBody

window.onload = boot

function boot() {
    authorSelect = id(ID_AUTHOR)
    orderSelect = id(ID_ORDER)
    postSection = id(ID_SECTION_POSTS)
    body = document.body
    btnDarkToggle = id(ID_BTN_DARK_TOGGLE)
    txtBody = id(ID_BODY)

    checkDarkModeState()

    if (authorSelect) authorSelect.onchange = handleFilterChange
    if (orderSelect) orderSelect.onchange = handleFilterChange
    if (btnDarkToggle) btnDarkToggle.onclick = toggleDarkMode
    if (txtBody) txtBody.addEventListener("input", autoResizeTextarea()) // É prepositado a chamada da função no boot, pois se já lá houver texto quero que a caixa se adapte antes do utilizador começar a escrever

}


function handleFilterChange() {
    const relevantCols = [authorSelect, orderSelect, postSection]
    if (!qualityControl(relevantCols)) {
        window.alert("One or more important elements is missing.")
        return
    }
    PostFilter.author = authorSelect.value
    PostFilter.order = orderSelect.value
    fetchFilteredPosts()
}

function fetchFilteredPosts() {
    const url = `/filter?${PostFilter.toQueryString()}`
    fetch(url)
        .then(resp => {
            if (!resp.ok) throw new Error("Failed to fetch.")
            return resp.json() 
        })
        .then(data => {
            renderPosts(data)
        })
        .catch(err => {
            console.error(err)
            postSection.innerHTML = "<p>Error loading posts.</p>"
        })
}

function renderPosts(posts) {
    let html = ""
    for (const post of posts) {
        html += PostView.toHtml(post)
    }
    postSection.innerHTML = html || "<p>No posts found.</p>"
}

function checkDarkModeState() {
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode")
        btnDarkToggle.innerHTML = '&#127761;'
    }
}

function toggleDarkMode() {
    body.classList.toggle("dark-mode");
    darkModeClass = body.classList.contains(DARK_MODE_CLASS);
    localStorage.setItem("dark-mode", darkModeClass ? "enabled" : "disabled");
    darkModeClass ? btnDarkToggle.innerHTML = '&#127761;' : btnDarkToggle.innerHTML = '&#127774'
}

function autoResizeTextarea() {
    txtBody.style.height = 'auto'
    txtBody.style.height = txtBody.scrollHeight + 'px'
}

