module.exports = {
    apps : [{
        name: 'batch-download',
        script: 'app.js',

        // 日志文件配置
        out_file: './logs/out.log',   // 标准输出日志
        error_file: './logs/error.log', // 错误日志
        log_file: './logs/combined.log', // 合并的日志（标准输出和错误）
        merge_logs: true, // 合并多个实例的日志文件
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        // 其他配置...pm2管理的应用程序的配置
        // pm2 install pm2-logrotate
        // pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
        // pm2 set pm2-logrotate:retain 30
        // pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD_HH-mm-ss'
        // pm2 set pm2-logrotate:max_size 100M
        // 卸载pm2模块
        // pm2 uninstall pm2-logrotate
        // pm2 restart all
    }]
};
