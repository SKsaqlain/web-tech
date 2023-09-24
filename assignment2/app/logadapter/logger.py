import uuid
import logging
import flask
import time
import uuid


def getTracking():
    if getattr(flask.g, 'trackingId', None):
        return flask.g.trackingId
    return int(time.time() * 1000)


class TrackingIdFilter(logging.Filter):
    def filter(self, record):
        record.trackingId = getTracking() if flask.has_request_context() else str(uuid.UUID(int=0))
        return True


LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.INFO)

sh = logging.StreamHandler()
sh.addFilter(TrackingIdFilter())

logFormatter = logging.Formatter(
    fmt="%(module)s: %(asctime)s - %(levelname)s - ID: %(trackingId)s - %(message).1000s"
)

sh.setFormatter(logFormatter)
LOGGER.addHandler(sh)

