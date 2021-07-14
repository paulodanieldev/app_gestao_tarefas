//criar metodos permitidos pelo cors da api
module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    //metodos permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    //metodos de cabecalhos permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, enctype ,count,authorization')
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next();
    }
  }