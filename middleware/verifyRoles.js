const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res.sendStatus(401).json({ message: "You are not allowed " });
    const rolesArray = [...allowedRoles];

    const result = req.roles

      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result)
      return res
        .sendStatus(401)
        .json({ message: "You don't have the necessary permissions " });
    next();
  };
};

module.exports = verifyRoles;
