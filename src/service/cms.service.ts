// @ts-nocheck
import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = await serverCall.get('/qualitypolicy')
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

const addSuppliers = async (body) => {
    try {
        const response = serverCall.post('/suppliers', body)
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

const getTradeOffer = async () => {
    try {
        const response = await serverCall.get('/tradeoffer')
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

const getAbc = async () => {
    try {
        const response = await serverCall.get('/abc/grouped')
        return response
    } catch (error) {
        throw error
    }
}

const CMSservice = {
    getList, requestSample, enquiry, getMarketRate, getPage, newsletter, imageUpload, quotation, buyerDashboard,
    creditAccount, addSuppliers, getCertificate, getFaq, getGallery, getTradeOffer, getStocklots, getAbc
};

export default CMSservice;
