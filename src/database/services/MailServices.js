const transporter = require('../mail');

const sendEmail = async (targetEmail, playlist) => {
    const emailBody = `
        <h1>Your Playlist: ${playlist.name}</h1>
        <ul>
            ${playlist.songs
                .map(song => `<li><strong>${song.title}</strong> by ${song.performer}</li>`)
                .join('')}
        </ul>
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
