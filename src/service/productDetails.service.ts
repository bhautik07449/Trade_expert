import serverCall from "../serverCall";

const getProduct = async (id: any) => {
    try {
        const response = serverCall.get(`/products/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const ProductDetailsservice = {
    getProduct
};

export default ProductDetailsservice;