interface serverResponse {
  message: string,
  success: boolean
}

interface products {
  _id: string
  name: string,
  category: string,
  price: number,
  description: string,
  quantity: number,
  image: {
    url: string,
    publicId: string
  },
  option: {
    title: string,
    value: string[]
  }[]
}

export interface createProduct {
  name: string,
  category: string,
  price: number,
  description: string,
  quantity: number,
  image: {
    url: string,
    publicId: string
  },
  option: {
    title: string,
    value: string[]
  }[]
}



export interface updateProduct extends Partial<createProduct> {
  id: string
}

export interface deleteProduct extends Partial<createProduct> {
  id: string 
}

export interface getProductsResponse extends serverResponse {
  data: products[]
}

export interface getProductResponse extends serverResponse {
  data: products
}

export interface createProductResponse extends serverResponse {
  data: products
}

export interface updateProductReponse extends serverResponse {
  data: products
}

export interface deleteProductResponse {
  data: products
}