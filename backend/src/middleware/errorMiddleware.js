export function errorHandler(error, _req, res, _next) {
  console.error(error);

  if (error?.code === 11000) {
    return res.status(409).json({ message: 'A record with this value already exists.' });
  }

  return res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error.',
  });
}
