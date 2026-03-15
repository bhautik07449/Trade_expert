import serverCall from "../serverCall";

const buyerRegister = async (body) => {
    try {
        const response = await serverCall.post('/buyers/signup', body)
        return response
    } catch (error) {
        throw error
    }
}

const buyerLogin = async (body) => {
    try {
        const response = await serverCall.post('/buyers/login', body)
        return response
    } catch (error) {
        throw error
    }
}

const Buyerservice = {
    buyerRegister, buyerLogin
};

export default Buyerservice;