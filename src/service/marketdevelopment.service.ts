import serverCall from "../serverCall";

const getMarketDevelopment = async () => {
    try {
        const response = serverCall.get('/marketdevelopment')
        return response
    } catch (error) {
        throw error
    }
}

const MarketDevelopmentService = {
    getMarketDevelopment
};

export default MarketDevelopmentService;
