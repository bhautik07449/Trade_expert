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

const emailTemplate = async (body) => {
    try {
        const response = await serverCall.post('/emailtemplate', body)
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

const CMSservice = {
    getList, requestSample, enquiry, getMarketRate, getPage, emailTemplate, imageUpload, quotation,
    creditAccount
};

export default CMSservice;