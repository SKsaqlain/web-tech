import sys
from flask import Flask, render_template
from app.routes.FindAllItems import FIND_ALL_ITEMS
from flask_cors import CORS, cross_origin
from app.logadapter.logger import *
import uuid

from app.routes.FindItem import FIND_ITEM

# logadapter.basicConfig(level=logadapter.INFO)

app = Flask(__name__)
app.static_folder = 'static'
app.register_blueprint(FIND_ALL_ITEMS)
app.register_blueprint(FIND_ITEM)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@cross_origin()
@app.route("/")
def hello_world():
    LOGGER.info("Rendering landing page")
    return render_template('index.html')

host="0.0.0.0"
port="5050"
debug=True
if __name__ == "__main__":
    # flask.g.trackingId=uuid.UUID(int=0)
    if(len(sys.argv) > 1):
        try:
            host=sys.argv[1]
            port=sys.argv[2]
            debug=bool(sys.argv[3])
        except:
            LOGGER.error("Invalid arguments")
            sys.exit(1)
    LOGGER.info("Starting Flask Server on host "+host+", port "+port+", debug "+str(debug))
    app.run(host=host, debug=debug, port=port)
