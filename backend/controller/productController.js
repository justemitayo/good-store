import Product from '../model/product.js'

export const getAllProduct = async (req, res) => {
  const product = await Product.find()
  if(!product) {
    return res.status(204).json({"message": "no product found"})
  }
  res.json(product)
}

export const postProduct = async(req, res) => {
  if(!req.body.name || !req.body.category || !req.body.price || !req.body.description){
    return res.status(400).json({"message" : "Name, Category, Price and Description fields are required"})
  }
  try{
    const result = await Product.create({
      name: req.body.name,
      category: req.body.category,
      image: {
        url: req.body.image?.url,
        publicId: req.body.image?.publicId
      },
      price: req.body.price,
      quantity: req.body.quantity,
      option: req.body.option
    })
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProduct = async(req, res) => {
  if(!req.body.id){
    return res.status(400).json({"message" : "Product ID is required"})
  }
  const product = await Product.findOne({_id: req.body.id})
  if(!product) {
    return res.status(204).json({"message": `There is no content present in user ${req.body.id}`})
  }
  if(req.body.name) {
    product.name = req.body.name
  }
  if(req.body.category) {
    product.category = req.body.category
  }
  if(req.body.image) {
    product.image = {
      url: req.body.image?.url,
      publicId: req.body.image?.publicId
    }
  }
  if(req.body.price) {
    product.price = req.body.price
  }
  if(req.body.quantity) {
    product.quantity = req.body.quantity
  }
  if(req.body.option) {
    product.option = req.body.option
  }
  const result = await product.save()

  res.json(result)
}

export const deleteProduct = async (req, res) => {
  if(!req.params.id){
    return res.status(400).json({"message": "product ID is required"})
  }
  const product = await Product.findOne({_id: req.params.id})
  if(!product) {
    return res.status(204).json({"message": `no product found for ${req.params.id}`})
  }
  const deleteProduct = await product.deleteOne({_id: req.params.id})
  res.json(deleteProduct)
}

export const getProduct = async(req, res) => {
  if(!req.params.id){
    return res.status(400).json({"message": "Product ID is required" })
  }
  const product = await Product.findOne({_id: req.params.id})

  if(!product) {
    return res.status(204).json({"message": `no product found for id ${req.params.id}`})
  }

  res.json(product)
}