import serverCall from "../serverCall";

const getProductList = async () => {
    try {
        const response = serverCall.get('/products')
        return response
    } catch (error) {
        throw error
    }
}

const getById = async (id) => {
    try {
        const response = await serverCall.get(`/products/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getBanner = async () => {
    try {
        const response = serverCall.get('/homebanner')
        return response
    } catch (error) {
        throw error
    }
}

const getTestimonial = async () => {
    try {
        const response = serverCall.get('/testimonial')
        return response
    } catch (error) {
        throw error
    }
}

const Homeservice = {
    getProductList, getById, getBanner, getTestimonial
};

export default Homeservice;