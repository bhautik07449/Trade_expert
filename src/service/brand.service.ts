// @ts-nocheck
import serverCall from "../serverCall";

const getList = async (country) => {
    try {
        const response = serverCall.get('/brands/grouped', { params: country ? { country: country } : {} })
        return response
    } catch (error) {
        throw error
    }
}

const Brandservice = {
    getList
};

export default Brandservice;
