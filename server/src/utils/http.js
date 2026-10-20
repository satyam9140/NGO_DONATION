function sendSuccess(res, payload = {}, status = 200) {
  return res.status(status).json({ ok: true, ...payload });
}

function sendError(res, status = 500, message = "Server error", details) {
  return res.status(status).json({ ok: false, error: message, details });
}

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = { sendSuccess, sendError, asyncHandler };
