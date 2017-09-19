var schedule = require('node-schedule');

logger.info('刷新微信JSAPI票据定时任务，每小时运行');
var rule = new schedule.RecurrenceRule();
rule.minute = 0;
rule.second = 0;
schedule.scheduleJob(rule, function() {
    request.post('https://api.weixin.qq.com/cgi-bin/token', {form: {grant_type: 'client_credential', appid: config.third.weixin.appId, secret: config.third.weixin.appSecret}}, function(err, rsp, body) {
        if (err) {
            logger.error(err);
            return;
        }
        var accessToken = JSON.parse(body).access_token;
        if (accessToken) {
            request.post('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi', {form: {access_token: accessToken, type: 'jsapi'}}, function(err, rsp, body) {
                var ticket = JSON.parse(body).ticket;
                if (ticket) {
                    redisUtil.client().setex(config.weixinTicketPrefix, config.weixinTicketExpireTime, ticket);
                }
            });
        }
    });
});