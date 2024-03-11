from flask import Flask, send_from_directory

app = Flask(__name__)

# path for main page
@app.route("/")
def base():
    return send_from_directory('client/public', 'index.html')

# path for all static files
@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

# path for test
@app.route("/test")
def test():
    return 1

if __name__ == "__main__":
    app.run(debug=True)