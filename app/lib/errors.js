var errors = {
  Forbidden: Forbidden
};

module.exports = errors;

// 403 - Forbidden error
function Forbidden() {
  function error(message, errorCode) {
    Error.captureStackTrace(this, this.constructor);

    this.message = message || 'This resource is Forbidden';
    this.status = 403;
    this.errorCode = errorCode || 403;
  }
  
  return new error();
}