const express = require('express');
const router = express.Router();
const { searchParamsValidationRules } = require('../middlewares/validationRules');
const { validationResult } = require("express-validator");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const prisma = require('../prisma/prisma');

router.get('/', searchParamsValidationRules(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { shareCode } = req.query;

    try {
        // 首先尝试找到数据
        const sharedData = await prisma.alist_download_list.findUnique({
            where: {
                shareCode: shareCode
            }
        });

        // 如果找到数据
        if (sharedData) {
            // 更新 queryCount
            await prisma.alist_download_list.update({
                where: {
                    shareCode: shareCode
                },
                data: {
                    queryCount: {
                        increment: 1
                    }
                }
            });

            // 返回数据
            res.status(200).json({
                status: 'success',
                data: sharedData,
                message: 'Data retrieved successfully'
            });
        } else {
            res.status(404).json({
                status: 'error',
                data: null,
                message: 'ShareCode not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            data: null,
            message: 'An error occurred while fetching the data'
        });
    }
});



module.exports = router;
