require('dotenv').config();

const { consumeMessages } = require('./database/services/ConsumerServices');

const init = async () => {
    consumeMessages();
};

init();