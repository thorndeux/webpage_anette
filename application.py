from flask import Flask, render_template, request
from flask_mail import Mail, Message

app = Flask(__name__)
# Load config data from an environment variable. Needs to be set with
# 'export FLASK_SETTINGS="path/to/file.cfg"'. Includes mail server, port,
# username(i.e. email address), default sender, and password.
app.config.from_envvar("FLASK_SETTINGS")

mail = Mail(app)

@app.route("/")
def index():
    return render_template("index.html", current="index")

@app.route("/<string:route>")
def page(route):
    return render_template(route + ".html", current=route)

# Contact form handling
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
        feedback = ["Message sent. We will get back to you as soon as possible.", "Nachricht wurde gesendet. Wir melden uns so bald wie möglich."]
    except Exception as e:
        feedback = [str(e), str(e)]
    return {'feedback': feedback}
