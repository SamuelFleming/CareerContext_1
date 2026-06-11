//server/src/middleware/mediaTypeValidator.js

const mediaTypeValidator = (req, res, next) => {
    console.log(`mediaTypeValidator  for request (headers): ${req.toString()}`);
    //only check requests that SHOULD have a body
    const methodsWithBody = ["POST", "PUT"];

    if (methodsWithBody.includes(req.method)) {
        const contentType = req.headers["content-type"];

        // Check if content-type exists and includes application/json
        if (!contentType || !contentType.includes("application/json")) {
            return res.status(415).json({
                message: "Unsupported Media Type. Use application/json"
            });
        }
    }

    //everything is fine → continue
    next();
};

module.exports = mediaTypeValidator;