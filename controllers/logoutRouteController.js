const logout = (req, res) => {
  res
    .clearCookie("token")
    .send("Logout successfull.")
}

module.exports.logout = logout;;