const lib = {};
const jwt = require("jsonwebtoken");


lib.checkAuthentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const [, jtk] = token.toString().split(" ");
    try {
      const { id } = jwt.verify(jtk, process.env.JWT_KEY);
      if (id) {
        res.locals.id = id;
        next();
      } else {
        res
        .status(401)
        .json({
          title: "Sorry somthing error",
          msg: "Please login again",
        });
      }
    } catch (err) {
      res
      .status(401)
      .json({
        title: "Sorry somthing error",
        msg: "Please login again",
      });
    }
  } else {
    res
      .status(401)
      .json({
        title: "Not loged in",
        msg: "Please log in first and try again."
      })
  }
};

lib.getUniqueId = function ( idLength ) {
  const acceptCharts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  const generatedIds = []

  const length = idLength || 15;

  function uniqueId() {
    let uId = '';
    for(let i = 0; i < length; i++) {
      const randomPos = Math.floor(Math.random() * (acceptCharts.length - 0 + 1) + 0)
      const char = acceptCharts[randomPos];
      
      if(char) {
        uId += char;
      }
    }
    if(generatedIds.includes(uId)) {
      uniqueId();
    } else {
      generatedIds.push(uId)
      return uId;
    }
  }

  return uniqueId;
}

module.exports = lib;