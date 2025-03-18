const transporter = require('../mail');

const sendEmail = async (targetEmail, playlist) => {
    const exportData = {
        playlist: playlist
    };

    const jsonContent = JSON.stringify(exportData, null, 2);

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: targetEmail,
        subject: 'Your Exported Playlist',
        text: 'Attached is your playlist in JSON format.',
        attachments: [
            {
                filename: `${playlist.name}.json`,
                content: jsonContent,
                contentType: 'application/json',
            },
        ],
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email result: ', result);
};

module.exports = { sendEmail };
