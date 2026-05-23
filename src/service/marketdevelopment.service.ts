import serverCall from "../serverCall";

const getMarketDevelopment = async () => {
    try {
        const response = serverCall.get('/marketdevelopment')
        return response
    } catch (error) {
        throw error
    }
}

const addMarketDevelopment = async (payload: any) => {
    try {
        const response = serverCall.post('/marketdata', payload)
        return response
    } catch (error) {
        throw error
    }
}

const MarketDevelopmentService = {
    getMarketDevelopment, addMarketDevelopment
};

export default MarketDevelopmentService;
