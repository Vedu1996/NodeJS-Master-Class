module.exports = {
    sayHello: (req, respondWith) => {
        const name = req.param.name || 'there';
        respondWith(200, {message: `Hey ${name}!!!`});
    }
};