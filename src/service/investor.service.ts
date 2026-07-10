// @ts-nocheck
import serverCall from "../serverCall";

const investorRegister = async (body) => {
    try {
        const response = await serverCall.post('/investors', body)
        return response
    } catch (error) {
        throw error
    }
}

const investorLogin = async (body) => {
    try {
        const response = await serverCall.post('/investors/login', body)
        return response
    } catch (error) {
        throw error
    }
}

const getProfile = async (id) => {
    try {
        const response = await serverCall.get(`/investors/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const forgotPassword = async (body) => {
    try {
        const response = await serverCall.post('/investors/forgot-password', body)
        return response
    } catch (error) {
        throw error
    }
}

const Investorservice = {
    investorRegister, investorLogin, getProfile, forgotPassword
};

export default Investorservice;
