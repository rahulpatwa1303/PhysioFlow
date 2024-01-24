const { CronJob } = require('cron');
const fetch = require('node-fetch');

new CronJob(
'* * * * * *',
async function() {
    console.log('GETTING!');
    // const response =  await fetch('http://localhost:3000/api/hello');
console.log('RESPONSE', response);
}, null, true, 'America/Los_Angeles');