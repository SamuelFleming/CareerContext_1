// server/src/notImplemented.js

function notImplemented(endpoint, futurePurpose) {
  return (req, res) => {
    return res.status(501).json({
      status: 501,
      message: 'Not implemented',
      endpoint,
      futurePurpose,
    });
  };
}

module.exports = {
  notImplemented,
};