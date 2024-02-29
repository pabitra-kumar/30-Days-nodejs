function errorHandler(err, req, res, next) {
    console.error('Error:', err);

    // Check if the error is an instance of Express's built-in HttpError
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Bad request: Invalid JSON' });
    }

    // Customize error response based on your application's needs
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ error: message });
}

module.exports = errorHandler;
