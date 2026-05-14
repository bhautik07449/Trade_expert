// @ts-nocheck
import serverCall from "../serverCall";

const getProductList = async (season) => {
    try {
        const url = season && season !== 'all' ? `/products?season=${season}` : '/products';
        const response = await serverCall.get(url)
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

const getProductBygroup = async (country) => {
    try {
        const response = await serverCall.get(`/countryproduct/grouped?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const Homeservice = {
    getProductList, getById, getBanner, getTestimonial, getIntouch, emailTemplate, getProductByslug, getProductBygroup
};

export default Homeservice;
