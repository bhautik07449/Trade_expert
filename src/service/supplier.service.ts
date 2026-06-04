// @ts-nocheck
import serverCall from "../serverCall";

const suppliersRegister = async (body) => {
    try {
        const response = serverCall.post('/suppliers', body)
        return response
    } catch (error) {
        throw error
    }
}

const supplierLogin = async (body) => {
    try {
        const response = await serverCall.post('/suppliers/login', body)
        return response
    } catch (error) {
        throw error
    }
}

const forgotPassword = async (body) => {
    try {
        const response = await serverCall.post('/suppliers/forgot-password', body)
        return response
    } catch (error) {
        throw error
    }
}

const Supplierservice = {
    suppliersRegister, supplierLogin, forgotPassword
};

export default Supplierservice;
