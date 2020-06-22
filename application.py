from flask import Flask, jsonify, make_response, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)
# Load config data from an environment variable. Needs to be set with
# 'export FLASK_SETTINGS="path/to/file.cfg"'. Includes mail server, port,
# username(i.e. email address), default sender, and password.
app.config.from_envvar("FLASK_SETTINGS")

mail = Mail(app)

@app.route("/")
def index(pages = []):
    # Data to construct navbar and image urls
    pages = [("index", "Home", "Startseite", "sunset-174276", "Poppy Field"),
            ("rosen", "About Rosen", "Rosen", "physiotherapy-567021", "Rosen Touch"),
            ("services", "Services", "Angebot", "water-lily-3784022", "Water Lily"),
            ("about", "About Me", "Über mich", "religion-4335820", "Prayer Flags"),
            ("contact", "Contact", "Kontakt", "mentor-3610255", "Helping Hand")]
    return render_template("index.html", current="index", pages=pages)

@app.route("/<string:route>")
def page(route, pages = []):
    # Data to construct navbar and image urls
    pages = [("index", "Home", "Startseite", "sunset-174276", "Poppy Field"),
            ("rosen", "About Rosen", "Rosen", "physiotherapy-567021", "Rosen Touch"),
            ("services", "Services", "Angebot", "water-lily-3784022", "Water Lily"),
            ("about", "About Me", "Über mich", "religion-4335820", "Prayer Flags"),
            ("contact", "Contact", "Kontakt", "mentor-3610255", "Helping Hand")]
    return render_template(route + ".html", current=route, pages=pages)

@app.route("/contact", methods = ["POST"])
def contact():
    # Get serialized form data
    form = request.form
    # Compose message
    msg = Message("Your webpage received a new contact request!", recipients =[app.config["MAIL_USERNAME"]])
    msg.body = "Hello Anette,\n\n{0} <{1}> has left the following message:\n\n{2}".format(form["name"], form["email"], form["message"])
    #Send message
    try:
        mail.send(msg)
        feedback = "Message sent. We will get back to you as soon as possible."
    except Exception as e:
        feedback = str(e)

    response = {'feedback': feedback}
    return make_response(jsonify(response), 200)
