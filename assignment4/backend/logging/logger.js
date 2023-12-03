const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, timestamp, trackingId }) => {
            if (!trackingId) {
                trackingId = 'DefaultTrackingId'; // Provide a default tracking ID
            }
            return `${timestamp} [${trackingId}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(), // You can add more transports here
    ],
});

module.exports = logger;
