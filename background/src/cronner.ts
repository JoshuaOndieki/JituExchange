import cron from 'node-cron'
import watchForWelcomeEmails from './watchers/welcome.watcher';
import watchAcceptedAnswers from './watchers/accepted.answers.watcher';

// set a flag to ensure cron does not spawn multiple instances and end up sending multiple same emails should the process of sending take longer than 5 seconds
let sendingEmails = false

const cronner = cron.schedule('*/5 * * * * *', async () => {
    if (sendingEmails) {
        return
    }
    sendingEmails = true
    console.log('   ⏳  last checked on ' + new Date().toLocaleString());

    try {
        await watchForWelcomeEmails()
        await watchAcceptedAnswers()
    } catch (error) {
        console.log(error);
    }
    sendingEmails = false // reset flag after done sending emails, if any.
}, {
    scheduled: false
})

cronner.start()