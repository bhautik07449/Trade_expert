// @ts-nocheck
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

const getProfile = async (id) => {
    try {
        const response = await serverCall.get(`/buyers/admin/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const forgotPassword = async (body) => {
    try {
        const response = await serverCall.post('/buyers/forgot-password', body)
        return response
    } catch (error) {
        throw error
    }
}

const Buyerservice = {
    buyerRegister, buyerLogin, getProfile, forgotPassword
};

export default Buyerservice;
