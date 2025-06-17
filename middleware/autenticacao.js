function autenticacao(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }
  
  req.usuario = {
    id: req.session.userId
  };
  
  next();
}

module.exports = autenticacao; 