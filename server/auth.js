const { sign, verify } = require("jsonwebtoken");

const { user } = require("./models/user");

const TOKEN_SECRET = "JvnDmql7+OSE$D%Q_3p[m_RSbz8^;e";

function createToken(user) {
  const accessToken = sign({ userId: user.id }, TOKEN_SECRET, {
    expiresIn: "7d"
  });

  return { accessToken };
}

async function isAuth(request, _, next) {
  const token = request.headers.authorization;
  let data;

  if (!token) {
    return next(new Error("missing authorization header"));
  }

  try {
    data = verify(JSON.parse(token), TOKEN_SECRET);
  } catch {
    return next(new Error("missing authorization header"));
  }

  const query = await user.findOne({ _id: data.userId });

  if (!query) {
    return next(new Error("missing authorization header"));
  }

  request.user = query.id;

  next();
}

module.exports = { createToken, isAuth };
