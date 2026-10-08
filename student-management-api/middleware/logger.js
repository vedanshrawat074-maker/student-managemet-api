// Custom Logger Middleware - logs HTTP method, URL and time for every request
const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next(); // pass control to the next middleware / route
};

module.exports = logger;
