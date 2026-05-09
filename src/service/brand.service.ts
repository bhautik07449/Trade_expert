// @ts-nocheck
import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/brands')
        return response
    } catch (error) {
        throw error
    }
}

const Brandservice = {
    getList
};

export default Brandservice;
