"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_HTTP_STATUS_MESSAGES = {
    400: 'Bad Requests',
    401: 'Unauthorized',
    403: 'Foribdden',
    404: 'Not Found',
    409: 'duplicate',
    500: 'Internal Server Error',
    503: 'Temporary Unavailable',
};
;
const errorGenerator = ({ msg = '', statusCode = 500 }) => {
    //인자로 들어오는 메세지와 상태 코드를 매핑
    const err = new Error(msg || DEFAULT_HTTP_STATUS_MESSAGES[statusCode]);
    err.statusCode = statusCode;
    throw err;
};
exports.default = errorGenerator;
