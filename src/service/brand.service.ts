// @ts-nocheck
import serverCall from "../serverCall";

const getList = async () => {
    try {
        const response = serverCall.get('/brands/grouped')
        return response
    } catch (error) {
        throw error
    }
}

const Brandservice = {
    getList
};

export default Brandservice;
