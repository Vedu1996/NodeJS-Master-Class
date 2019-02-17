module.exports = {
    sayHello: (req, respondWith) => {
        respondWith(200, {message: 'Hey there!!!'});
    }
};