# -*- coding: utf-8 -*-

from flask import Flask, make_response, render_template, request, send_from_directory
from flask_mail import Mail, Message

app = Flask(__name__)
# Load config data from an environment variable. Needs to be set with
# 'export FLASK_SETTINGS="path/to/file.cfg"'. Includes mail server, port,
# username(i.e. email address), default sender, and password.
app.config.from_envvar("FLASK_SETTINGS")

mail = Mail(app)

# Determines appropriate locale
def localize(selection):
    # If a selection has been supplied, use that for locale
    if selection:
        locale = selection
    else:
        # Set 'locale' to cookie value
        locale = request.cookies.get("locale")
        # If cookie hasn't been set
        if locale is None:
            # Use langage that best matches Accept_language header
            locale = request.accept_languages.best_match("de", "en")
    return locale

# Serves the sitemap
@app.route("/sitemap.xml")
def sitemap():
    return send_from_directory(".", "sitemap.xml")

# Serves robots.txt
@app.route("/robots.txt")
def robots():
    return send_from_directory(".", "robots.txt")

@app.route("/")
def index():
    # If request has a 'locale' argument, provide it to localize() function
    locale = localize(request.args.get("locale"))
    # If request came from the cookie notice, store value in 'cookies'
    cookies = request.args.get("cookies")
    # Construct response
    resp = make_response(render_template("index.html", current="index", locale=locale, cookies=cookies))
    # If request came from the selection menu, add cookie instructions to response
    if request.args.get("locale"):
        resp.set_cookie("locale", locale, max_age=60*60*24*30, httponly=True, samesite="Lax")
    # If request came from the cookie notice, add cookie instructions to response
    if request.args.get("cookies"):
        resp.set_cookie("cookies", cookies, max_age=60*60*24*30, httponly=True, samesite="Lax")
    # Return response
    return resp

@app.route("/<string:route>")
def page(route):
    # If request has a 'locale' argument, provide it to localize() function
    locale = localize(request.args.get("locale"))
    # If request came from the cookie notice, store value in 'cookies'
    cookies = request.args.get("cookies")
    # Construct response
    resp = make_response(render_template(route + ".html", current=route, locale=locale, cookies=cookies))
    # If request came from the selection menu, add cookie instructions to response
    if request.args.get("locale"):
        resp.set_cookie("locale", locale, max_age=60*60*24*30, httponly=True, samesite="Lax")
    # If request came from the cookie notice, add cookie instructions to response
    if request.args.get("cookies"):
        resp.set_cookie("cookies", "ok", max_age=60*60*24*30, httponly=True, samesite="Lax")
    # Return response
    return resp

# Contact form handling
@app.route("/contact", methods = ["POST"])
def contact():
    # Get serialized form data
    form = request.form
    # Compose message
    msg = Message("Your webpage received a new contact request!", recipients = ["info@fullybeing-bodywork.com"])
    msg.body = "Hello Anette,\n\n{0} <{1}> has left the following message:\n\n{2}".format(form["name"], form["email"], form["message"])
    # Send message
    try:
        mail.send(msg)
        locale = localize(None)
        feedback = ["Message sent. We will get back to you as soon as possible.",
                    "Nachricht wurde gesendet. Wir melden uns so bald wie möglich."]
        category = "success"
    # Handle exceptions
    except Exception as e:
        if request.cookies.get("JSenabled"):
            feedback = [str(e), str(e)]
        else:
            locale = localize(None)
            feedback = ["Something went wrong. Your message could not be sent. \
                        Please try sending an email to info@fullybeing-bodywork.com.",
                        "Ihre Nachricht konnte nicht gesendet werden. Bitte senden \
                        Sie eine Email an info@fullybeing-bodywork.com."]
            category = "warning"
    # If JavaScript is enabled, just return feedback, which will be handled by 'contact.js'
    if request.cookies.get("JSenabled"):
        return {'feedback': feedback}
    # Else render contact page with appropriate feedback information
    else:
        return render_template("contact.html", current="contact", locale=locale, feedback=feedback, category=category)
