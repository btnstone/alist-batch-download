const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { downloadListValidationRules } = require('../middlewares/validationRules');
const fetchAlistContents = require('../utils/fetchAlistContents'); // 调整路径以匹配您的项目结构

router.post('/get-download-list', downloadListValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const paths = req.body.path;  // 获取多个路径
        const authToken = process.env.AUTH_TOKEN || "";

        // 使用 Promise.allSettled 并发处理所有路径
        const contentsPromises = paths.map(path => fetchAlistContents(path, authToken));
        const results = await Promise.allSettled(contentsPromises);

        // 处理每个结果，只保留成功的内容
        const successfulContents = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value);

        // 将所有成功的内容合并到一个数组中
        const aggregatedContent = successfulContents.flat();

        res.status(200).json(aggregatedContent);
    } catch (error) {
        res.status(500).json({ message: error.message, stack: error.stack });
    }


});

module.exports = router;
