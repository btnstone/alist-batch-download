const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const downloadRoutes = require('./routes/downloadRoutes');
const searchRoutes = require('./routes/searchRoutes');
const {log} = require("./utils/logger");
app.use(express.json());
app.use(morgan('combined')); // 日志库

// 使用下载相关的路由
app.use('/downloads', downloadRoutes);
app.use('/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
