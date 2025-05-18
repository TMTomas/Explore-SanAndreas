from flask import Flask, render_template, request

app = Flask(__name__)

@app.route(rule="/", methods=["GET"])
def home():
    return render_template("/home/home.html")

@app.route(rule="/new", methods=["GET"])
def create_post():
    return render_template("/articles/create.html")

if __name__ == "__main__":
    app.run(debug=True)