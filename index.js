var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
schedule.scheduleJob(rule, function() {
    var filePath = '/root/playback/js3mj/' + utils.dateFormat(new Date(new Date().getTime() - 60 * 60 * 24 * 15 * 1000), 'yyyy-MM-dd');
    if (fs.existsSync(filePath)) {
        logger.info('删除文件夹:', filePath);
        exec('rm -rf ' + filePath);
    }
});