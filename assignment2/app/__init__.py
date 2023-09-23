import sys
from flask import Flask, render_template
from app.routes.FindAllItems import FIND_ALL_ITEMS
from flask_cors import CORS, cross_origin
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.register_blueprint(FIND_ALL_ITEMS)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

@cross_origin()
@app.route("/")
def hello_world():
    logging.info("Rendering landing page")
    return render_template('index.html')

host="0.0.0.0"
port="5050"
debug=True
if __name__ == "__main__":
    if(len(sys.argv) > 1):
        try:
            host=sys.argv[1]
            port=sys.argv[2]
            debug=bool(sys.argv[3])
        except:
            logging.error("Invalid arguments")
            sys.exit(1)
    logging.info("Starting Flask Server on host %s, port %s, debug %s", host,port,debug)
    app.run(host=host, debug=debug, port=port)
