function autenticar(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).json({ erro: 'Usuário não autenticado.' })
  }
  next()
}

module.exports = autenticar 