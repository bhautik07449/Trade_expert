import serverCall from "../serverCall";

const getProductList = async () => {
    try {
        const response = serverCall.get('/products')
        return response
    } catch (error) {
        throw error
    }
}

const getProductByslug = async (slug) => {
    try {
        const response = serverCall.get(`/products/category/${slug}`)
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
        const response = await serverCall.get('/homebanner')
        return response
    } catch (error) {
        throw error
    }
}

const getTestimonial = async () => {
    try {
        const response = await serverCall.get('/testimonial')
        return response
    } catch (error) {
        throw error
    }
}

const getIntouch = async (body) => {
    try {
        const response = await serverCall.post('/contact', body)
        return response
    } catch (error) {
        throw error
    }
}

const emailTemplate = async (body) => {
    try {
        const response = await serverCall.post('/emailtemplate', body)
        return response
    } catch (error) {
        throw error
    }
}

const Homeservice = {
    getProductList, getById, getBanner, getTestimonial, getIntouch, emailTemplate, getProductByslug
};

export default Homeservice;