const jwt  = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try{
    console.log("authenticating...")
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token,typeof(token))
    if (token==="null") {
      console.log("if cond")
      return res.status(401).json({ success:false, message: "No token provided" });
    }
    // console.log("exectuing this")
    const verified = jwt.verify(token,process.env.JWT_SECRET);
    // console.log(verified);
    req.body.userId = verified.user_id;

    next();
  }
  catch(err){
    console.log(err);
  }
}

module.exports = auth;