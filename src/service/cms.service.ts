// @ts-nocheck
import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = await serverCall.get('/qualitypolicy/grouped')
        return response
    } catch (error) {
        throw error
    }
}

const requestSample = async (body) => {
    try {
        const response = await serverCall.post('/requestsamples', body)
        return response
    } catch (error) {
        throw error
    }
}

const enquiry = async (body) => {
    try {
        const response = await serverCall.post('/inquiry', body)
        return response
    } catch (error) {
        throw error
    }
}

const creditAccount = async (body) => {
    try {
        const response = await serverCall.post('/creditaccount', body)
        return response
    } catch (error) {
        throw error
    }
}

const quotation = async (body) => {
    try {
        const response = await serverCall.post('/quotation', body)
        return response
    } catch (error) {
        throw error
    }
}

const getMarketRate = async () => {
    try {
        const response = await serverCall.get('/dmr/market-data')
        return response
    } catch (error) {
        throw error
    }
}

const getPage = async (slug) => {
    try {
        const response = await serverCall.get(`/pages/slug/${slug}`)
        return response
    } catch (error) {
        throw error
    }
}

const newsletter = async (body) => {
    try {
        const response = await serverCall.post('/newsletter', body)
        return response
    } catch (error) {
        throw error
    }
}

const imageUpload = async (body) => {
    try {
        const response = serverCall.post('/upload', body)
        return response
    } catch (error) {
        throw error
    }
}

const buyerDashboard = async () => {
    try {
        const response = await serverCall.get('/dashboard/front')
        return response
    } catch (error) {
        throw error
    }
}

const getCertificate = async () => {
    try {
        const response = await serverCall.get('/certificationslider')
        return response
    } catch (error) {
        throw error
    }
}

const getFaq = async () => {
    try {
        const response = await serverCall.get('/faq')
        return response
    } catch (error) {
        throw error
    }
}

const getGallery = async () => {
    try {
        const response = await serverCall.get('/gallery')
        return response
    } catch (error) {
        throw error
    }
}

const getTradeOffer = async (country: string) => {
    try {
        const response = await serverCall.get(`/tradeoffer/country?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const getStocklots = async (id) => {
    try {
        const response = await serverCall.get(`/tradeoffer/grouped/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const getAbc = async (country: string) => {
    try {
        const response = await serverCall.get(`/abc/grouped?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const careerForm = async (body) => {
    try {
        const response = await serverCall.post('/career', body)
        return response
    } catch (error) {
        throw error
    }
}

const getDeliveryReach = async (country: string) => {
    try {
        const response = await serverCall.get(`/deliveryreach?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const getCategoryById = async (id: string) => {
    try {
        const response = await serverCall.get(`/categories/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const addOfferRequest = async (body) => {
    try {
        const response = await serverCall.post('/offerrequest', body);
        return response;
    } catch (error) {
        throw error;
    }
}

const getProject = async (country?: string, category?: string) => {
    try {
        const response = await serverCall.get('/ir_project', { params: country || category ? { country: country, category: category } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const PublicPrivateLogin = async (body) => {
    try {
        const response = await serverCall.post('/career/login', body)
        return response
    } catch (error) {
        throw error
    }
}

const forgotPassword = async (body) => {
    try {
        const response = await serverCall.post('/career/forgot-password', body)
        return response
    } catch (error) {
        throw error
    }
}

const CMSservice = {
    getList, requestSample, enquiry, getMarketRate, getPage, newsletter, imageUpload, quotation, buyerDashboard,
    creditAccount, getCertificate, getFaq, getGallery, getTradeOffer, getStocklots, getAbc, careerForm,
    getDeliveryReach, getCategoryById, addOfferRequest, getProject, PublicPrivateLogin, forgotPassword
};

export default CMSservice;
