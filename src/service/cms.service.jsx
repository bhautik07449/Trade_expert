import serverCall from "../serverCall";

const getList = async (body) => {
    try {
        const response = await serverCall.get('/qualitypolicy', body)
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

const getMarketRate = async (body) => {
    try {
        const response = await serverCall.get('/dmr', body)
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

const CMSservice = {
    getList, requestSample, enquiry, getMarketRate, getPage
};

export default CMSservice;