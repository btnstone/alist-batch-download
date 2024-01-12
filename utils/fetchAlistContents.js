const axios = require('axios');
const fetchFileDetails = require('./fetchFileDetails');
const {log} = require("./logger"); // 确保路径正确

async function fetchAlistContents(path, authToken) {
    const apiURL = process.env.API_URL + '/api/fs/list';
    let content = [];
    console.log("start fetchAlistContents:" + path)
    try {
        const response = await axios.post(apiURL, {
            path: path,
            password: "",
            page: 1,
            per_page: 0,
            refresh: false
        }, {
            headers: {
                Authorization: `${authToken}`
            }
        });
        if(response.status !== 200){
            throw new Error("Alist Server Error");
        }
        if(response.data.code !== 200){
            throw new Error(JSON.stringify(response.data));
        }

        if (response.data && response.data.data && response.data.data.content) {
            for (const item of response.data.data.content) {
                if (item.is_dir) {
                    // 递归调用以获取文件夹内容
                    const subContents = await fetchAlistContents(path + '/' + item.name, authToken);
                    content.push({
                        name: item.name,
                        size: item.size,
                        is_dir: item.is_dir,
                        contents: subContents
                    });
                } else {
                    // 对于文件，获取详细信息
                    const fileDetails = await fetchFileDetails(path + '/' + item.name, authToken);
                    content.push({
                        name: item.name,
                        size: item.size,
                        is_dir: item.is_dir,
                        raw_url: fileDetails ? fileDetails.raw_url : null
                    });
                }
            }
        }
        return content;
    } catch (error) {
        console.error('Error fetching data from alist:', error);
        throw error;
    }
}

module.exports = fetchAlistContents;
