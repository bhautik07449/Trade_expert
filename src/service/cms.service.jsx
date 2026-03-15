import serverCall from "../serverCall";

const getList = async (body) => {
    try {
        const response = await serverCall.get('/qualitypolicy', body)
        return response
    } catch (error) {
        throw error
    }
}


const CMSservice = {
    getList
};

export default CMSservice;