const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if(!req?.roles){
      return res.sendStatus(401)
    }

    const arrRoles = [...allowedRoles];

    const newRole = arrRoles.map((role) => arrRoles.includes(role)).find(value => value === true)

    if(!newRole) {
      return res.sendStatus(403)
    }

    next()
  }
}

export default verifyRole