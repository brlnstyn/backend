exports.success = (message, results, statusCode) => {
    if (!results) {
        return {
            rc: statusCode,
            rd: message,
            error: false,
        };
    } else {
        return {
            rc: statusCode,
            rd: message,
            error: false,
            results
        };
    }
};

/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
exports.error = (message, statusCode, results) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    rc: statusCode,
    rd: message,
    error: true,
    results
  };
};

/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
exports.validation = (errors) => {
  return {
    rc: 422,
    rd: "Validation errors",
    error: true,
    errors
  };
};