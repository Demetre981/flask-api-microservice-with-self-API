from flask import Flask, make_response
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/test")
def main():
    fal = 123
    main = "clear"
    nnn = "gg smk"
    fal2 = 324
    main2 = "bbb"
    nnn2 = "bb bbbb"
    fal3 = 234
    main3 = "aaaaa"
    nnn3 = "aaa aaa"
    b = [{"price": fal, "name": main, "subject": nnn}, {"price": fal2, "name": main2, "subject": nnn2}, {"price": fal3, "name": main3, "subject": nnn3}]
    r = make_response({"b": b}, 200)

    return r

