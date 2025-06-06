import os

from flask import (
    Blueprint,
    current_app,
    flash,
    g,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
    url_for,
)
from werkzeug.utils import secure_filename
from werkzeug.exceptions import abort

from .auth import login_required
from .db import get_db

bp = Blueprint("blog", __name__)


@bp.route("/")
def index():
    db = get_db()
    posts = db.execute(
        "SELECT p.id, title, body, created, author_id, username, media_filename, media_type"
        " FROM post p JOIN user u ON p.author_id = u.id"
        " ORDER BY created DESC"
    ).fetchall()
    authors = get_unique_authors()
    return render_template("blog/index.html", posts=posts, authors=authors)


@bp.route("/create", methods=("GET", "POST"))
@login_required
def create():
    if request.method == "POST":
        title = request.form["nameTitle"]
        body = request.form["nameBody"]
        error = None
        file = request.files.get("nameFile")
        filename = None
        media_type = None

        if error is not None:
            flash(error)
        else:
            if file and file.filename:
                filename = secure_filename(file.filename)
                file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))
                mimetype = file.mimetype
                if mimetype.startswith("image"):
                    media_type = "image"
                elif mimetype.startswith("video"):
                    media_type = "video"
            db = get_db()
            db.execute(
                "INSERT INTO post (title, body, author_id, media_filename, media_type)"
                " VALUES (?, ?, ?, ?, ?)",
                (title, body, g.user["id"], filename, media_type),
            )
            db.commit()
            return redirect(url_for("blog.index"))
    return render_template("blog/create.html")


@bp.route("/<int:id>/update", methods=("GET", "POST"))
@login_required
def update(id):
    post = get_post(id)

    if request.method == "POST":
        title = request.form["nameTitle"]
        body = request.form["nameBody"]
        file = request.files.get("nameFile")
        remove_file = "nameRemoveFile" in request.form

        filename = post["media_filename"]
        media_type = post["media_type"]
        error = None

        if not title:
            error += "Title is required "
        if remove_file and filename:
            try:
                os.remove(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))
            except FileNotFoundError:
                error += "File not found"
                pass
            filename = None
            media_type = None

        if file and file.filename:
            if filename:
                try:
                    os.remove(
                        os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
                    )
                except FileNotFoundError:
                    error += "File not found"
                    pass

            filename = secure_filename(file.filename)
            file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))

            mimetype = file.mimetype
            media_type = (
                "image"
                if mimetype.startswith("image")
                else "video" if mimetype.startswith("video") else None
            )

        if error is not None:
            flash(error)
        else:
            db = get_db()
            db.execute(
                "UPDATE post SET title = ?, body = ?, media_filename = ?, media_type = ? WHERE id = ?",
                (title, body, filename, media_type, id),
            )
            db.commit()
            return redirect(url_for("blog.index"))

    return render_template("blog/update.html", post=post)


@bp.route("/<int:id>/delete", methods=("POST",))
@login_required
def delete(id):
    get_post(id)
    db = get_db()
    db.execute("DELETE FROM post WHERE id = ?", (id,))
    db.commit()
    return redirect(url_for("blog.index"))


@bp.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)


@bp.route("/filter")
def filter_posts():
    db = get_db()
    author = request.args.get("author", "")
    order = request.args.get("order", "desc").lower()
    if order not in ["asc", "desc"]:
        order = "desc"

    query = """
        SELECT p.*, u.username
        FROM post p
        JOIN user u ON p.author_id = u.id
    """
    params = []

    if author:
        query += " WHERE u.username = ?"
        params.append(author)

    query += f" ORDER BY p.created {order.upper()}"

    posts = db.execute(query, params).fetchall()

    post_list = []
    user_id = g.user["id"] if g.user else None
    for post in posts:
        post_dict = dict(post)
        post_dict["is_owner"] = post["author_id"] == user_id
        post_list.append(post_dict)

    return jsonify(post_list)


def get_post(id, check_author=True):
    post = (
        get_db()
        .execute(
            "SELECT p.id, title, body, created, media_filename, media_type, author_id, username FROM post p JOIN user u ON p.author_id = u.id WHERE p.id = ?",
            (id,),
        )
        .fetchone()
    )

    if post is None:
        abort(404, f"Post id {id} doesn't exist.")

    if check_author and post["author_id"] != g.user["id"]:
        abort(403)

    return post


def get_unique_authors():
    db = get_db()
    rows = db.execute(
        """
        SELECT DISTINCT u.username
        FROM post p
        JOIN user u ON p.author_id = u.id
    """
    ).fetchall()
    return [row["username"] for row in rows]
