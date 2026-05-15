import serverCall from "../serverCall";

const getAnalyticalData = async () => {
    try {
        const response = serverCall.get('/analytical')
        return response
    } catch (error) {
        throw error
    }
}

const getEvents = async () => {
    try {
        const response = serverCall.get('/events')
        return response
    } catch (error) {
        throw error
    }
}

const getPresences = async () => {
    try {
        const response = serverCall.get('/presences')
        return response
    } catch (error) {
        throw error
    }
}

const getImageSliderByCountry = async (country: string) => {
    try {
        const response = serverCall.get(`/homebanner/country?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const getProductByCountry = async (country: string) => {
    try {
        const response = serverCall.get(`/products/country?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const getTradeHistoryByCountry = async (country: string) => {
    try {
        const response = serverCall.get(`/tradehistory/country?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const getAnalyticalByCountry = async (country: string) => {
    try {
        const response = serverCall.get(`/analytical/country?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const getImageSliderByCategory = async (category: string) => {
    try {
        const response = serverCall.get(`/homebanner/category?category=${category}`)
        return response
    } catch (error) {
        throw error
    }
}

const getSpotMarketRateByCategory = async (category: string) => {
    try {
        const response = serverCall.get(`/dmr/market-data/category?category=${category}`)
        return response
    } catch (error) {
        throw error
    }
}

const getCategoriesByCountry = async (country: string) => {
    try {
        const response = serverCall.get(`/categories/country?country=${country}`)
        return response
    } catch (error) {
        throw error
    }
}

const HomePageservice = {
    getAnalyticalData, getEvents, getPresences, getImageSliderByCountry, getImageSliderByCategory,
    getProductByCountry, getSpotMarketRateByCategory, getTradeHistoryByCountry, getAnalyticalByCountry,
    getCategoriesByCountry
};

export default HomePageservice;