import serverCall from "../serverCall";

const getESGGroup = async (country: string, category?: string) => {
    try {
        const response = serverCall.get('/esg/grouped', { params: country || category ? { country, category }  : { category } });
    return response
} catch (error) {
    throw error
}
}

const ESGService = {
    getESGGroup
};

export default ESGService;
