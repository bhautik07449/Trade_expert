import serverCall from "../serverCall";

const getMultilingual = async (country: string) => {
    try {
        const response = serverCall.get('/multilingual', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const getPolicypreamble = async () => {
    try {
        const response = serverCall.get('/policypreamble')
        return response
    } catch (error) {
        throw error
    }
}

const NewsandeventService = {
    getMultilingual, getPolicypreamble
};

export default NewsandeventService;
