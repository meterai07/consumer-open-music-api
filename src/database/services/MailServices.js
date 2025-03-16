const transporter = require('../mail');

const sendEmail = async (targetEmail, playlist) => {
    const exportData = {
        playlist: playlist
    };

    const jsonContent = JSON.stringify(exportData, null, 2);

    const emailBody = `
        <h1>Your Playlist</h1>
        <pre>${jsonContent}</pre>
    `;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: targetEmail,
        subject: `Your Playlist: ${playlist.name}`,
        html: emailBody,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent to', targetEmail);
};

module.exports = { sendEmail };
