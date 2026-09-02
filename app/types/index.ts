export interface serverResponse {
  message: string,
  success: boolean
}

export interface products {
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
  }[],
  createdAt: string,
  updatedAt: string
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
  _id: string
}

export interface deleteProduct {
  _id: string 
}

export interface getProductsResponse extends serverResponse {
  data: products[]
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    nextPage: number | null 
  }
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

export interface deleteProductResponse extends serverResponse {
  data: { acknowledged: boolean, deletedCount: number }
}