const validate = (req, res, next) => {
    const { productName, stockproduct, priceProduct } = req.body
    try {
      if (productName === '' || stockproduct === '' || priceProduct === '') throw new Error('kosong')
      if (isNaN(stockproduct) || isNaN(priceProduct)) throw new Error('input bukan angka')
      if (!isNaN(productName)) throw new Error('input bukan text')
    } catch (error) {
      res.send(`${error}`)
    }
    next()
}
  
//  cors ga dipake karena kita udah punya library cors
// const myCors = (req,res,next)=>{
//     response.setHeader('Access-Control-Allow-Origin', '*'); // url nya = semua
//     response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//     response.setHeader('Access-Control-Headers', 'Content-Type');
// } //ngeset header mana aja yang kita beri akses / mana aja yg boleh digunain /
  
module.exports = {
    validate,
    // myCors
}