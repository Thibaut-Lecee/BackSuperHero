const allowedOrigins =[
    'http://localhost:3000',
    'http://localhost:5000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
module.exports = corsOptions;