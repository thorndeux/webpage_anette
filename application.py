from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index(pages = []):
    pages = [("index", "Home", "sunset-174276", "Poppy Field"),
        	("rosen", "About Rosen", "physiotherapy-567021", "Rosen Touch"),
            ("services", "Services", "water-lily-3784022", "Water Lily"),
            ("about", "About Me", "religion-4335820", "Prayer Flags"),
            ("contact", "Contact", "mentor-3610255", "Helping Hand")]
    return render_template("index.html", current= "index", pages=pages)

@app.route("/<string:route>")
def page(route, pages = []):
    pages = [("index", "Home", "sunset-174276", "Poppy Field"),
        	("rosen", "About Rosen", "physiotherapy-567021", "Rosen Touch"),
            ("services", "Services", "water-lily-3784022", "Water Lily"),
            ("about", "About Me", "religion-4335820", "Prayer Flags"),
            ("contact", "Contact", "mentor-3610255", "Helping Hand")]
    return render_template(route + ".html", current=route, pages=pages)
