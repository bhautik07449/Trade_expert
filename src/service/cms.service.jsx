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

const CMSservice = {
    getList, requestSample
};

export default CMSservice;