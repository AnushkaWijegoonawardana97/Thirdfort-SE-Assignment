const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (request, response, next) {
  const token = request.header("x-auth-token");

  if (!token) {
    return response
      .status(401)
      .json({ msg: "No token, authorization denined" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded.user);

    request.user = decoded.user;

    next();
  } catch (error) {
    response.status(401).json({ msg: "token is not valid" });
  }
};
