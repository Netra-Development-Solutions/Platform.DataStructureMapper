// This module implements class HttpsStatusCodes
// This class is used to store the status codes and their corresponding messages

class HttpStatusCodes {
    static OK = 200;
    static CREATED = 201;
    static ACCEPTED = 202;
    static NO_CONTENT = 204;

    static MOVED_PERMANENTLY = 301;
    static FOUND = 302;
    static SEE_OTHER = 303;
    static NOT_MODIFIED = 304;
    static TEMPORARY_REDIRECT = 307;
    static PERMANENT_REDIRECT = 308;

    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static PAYMENT_REQUIRED = 402;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static METHOD_NOT_ALLOWED = 405;
    static NOT_ACCEPTABLE = 406;
    static PROXY_AUTHENTICATION_REQUIRED = 407;
    static REQUEST_TIMEOUT = 408;
    static CONFLICT = 409;

    static INTERNAL_SERVER_ERROR = 500;
    static NOT_IMPLEMENTED = 501;
    static BAD_GATEWAY = 502;
    static SERVICE_UNAVAILABLE = 503;
    static GATEWAY_TIMEOUT = 504;
}

module.exports = HttpStatusCodes;