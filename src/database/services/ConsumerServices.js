const amqp = require('amqplib');
const { sendEmail } = require('./MailServices');

const consumeMessages = async () => {
    const queue = 'export:playlist';
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, {
        durable: true
    });

    console.log(`Waiting for messages in ${queue}`);

    channel.consume(queue, async (message) => {
        const content = JSON.parse(message.content.toString());
        console.log('Message received', JSON.stringify(content, null, 2));

        const { playlist, targetEmail } = content;

        try {
            await sendEmail(targetEmail, playlist);
            channel.ack(message);
        } catch (error) {
            console.error('Error sending email', error);
            channel.nack(message);
        }
    });
};

module.exports = { consumeMessages };