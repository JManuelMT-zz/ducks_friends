module.exports = (str) => {
    const regex = /^(([a-zA-Z0-9-_ñ]+(\.[a-zA-Z0-9-_ñ]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(str);
};
