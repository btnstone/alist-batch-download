const axios = require('axios');

async function fetchFileDetails(filePath, authToken) {

    const apiURL = process.env.API_URL + '/api/fs/get';
    try {
        const response = await axios.post(apiURL, {
            path: filePath,
            password: "",  // 根据需要添加密码
            page: 1,
            per_page: 0,
            refresh: false
        }, {
            headers: {
                Authorization: `${authToken}`
            }
        });

        if (response.data && response.data.data) {
            return response.data.data;
        } else {
            return null; // 或者抛出一个错误
        }
    } catch (error) {
        console.error('Error fetching file details:', error);
        throw error;
    }
}

module.exports = fetchFileDetails;
