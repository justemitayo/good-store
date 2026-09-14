import Product from '../model/product.js'

export const getAllProduct = async (req, res) => {
  try{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 6
    const skip = (page - 1)* limit;
    const search = req.query.search || '';


    const query = search ? {
      $or: [
        {name:{$regex: search, $options: 'i'}},
        {category:{$regex: search, $options: 'i'}},
        {description:{$regex: search, $options: 'i'}}
      ]
    } : {}

  const total = await Product.countDocuments(query);
  const product = await Product.find(query).sort({createdAt: -1}).skip(skip).limit(limit)
  if(!product) {
    return res.status(204).json({success: false, message: "no product found"})
  }
  res.json({
    success: true, 
    message: "products fetched", 
    data: product,
    pagination: {
      page, 
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      nextPage: page < Math.ceil(total/ limit)? page + 1 : null
    } 
  })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  } 
}

export const postProduct = async(req, res) => {
  if(!req.body.name || !req.body.category || !req.body.price || !req.body.description){
    return res.status(400).json({success: false, message : "Name, Category, Price and Description fields are required"})
  }
  try{
    const result = await Product.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      image: {
        url: req.file?.path,
        publicId: req.file?.filename
      },
      price: req.body.price,
      quantity: req.body.quantity,
      option: req.body.option
    })
    res.status(201).json({success: true, message: "products created", data: result})
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const updateProduct = async(req, res) => {
  try{
  if(!req.params.id){
    return res.status(400).json({success: false, message : "Product ID is required"})
  }
  let product = await Product.findOne({_id: req.params.id}).exec()
  if(!product) {
    return res.status(404).json({success: false, message: `There is no content present in user ${req.params.id}`})
  }
  if(req.body.name !== undefined) {
    product.name = req.body.name
  }
  if(req.body.category !== undefined) {
    product.category = req.body.category
  }
  if(req.body.image !== undefined) {
    product.image = {
      url: req.file?.path,
      publicId: req.file?.filename
    }
  }
  if(req.body.price !== undefined) {
    product.price = req.body.price
  }
  if(req.body.quantity !== undefined) {
    product.quantity = req.body.quantity
  }
  if(req.body.option !== undefined) {
    product.option = JSON.parse(req.body.option)
  }
  if(req.body.description !== undefined) {
    product.description = req.body.description
  }
  const result = await product.save()

  res.json({success: true, message: "products updated", data: result})
} catch (err) {
  res.status(500).json({ success: false, message: err.message })
}
}

export const deleteProduct = async (req, res) => {
  try{
  if(!req.params.id){
    return res.status(400).json({success: false, message: "product ID is required"})
  }
  const product = await Product.findOne({_id: req.params.id}).exec()
  if(!product) {
    return res.status(404).json({ success: false, message: `no product found for ${req.params.id}`})
  }
  const deleteProduct = await product.deleteOne({_id: req.params.id})
  res.json({ success: true, message: "products deleted", data: deleteProduct})
} catch(err) {
  res.status(500).json({ success: false, message: err.message })
}
}

export const getProduct = async(req, res) => {
  try{ 
  if(!req.params.id){
    return res.status(400).json({success: false, message: "Product ID is required" })
  }
  const product = await Product.findOne({_id: req.params.id}).exec()

  if(!product) {
    return res.status(404).json({success: false, message: `no product found for id ${req.params.id}`})
  }

  res.json({success: true, message: "product fetched", data: product})
} catch (err) {
  res.status(500).json({ success: false, message: err.message })
}
}