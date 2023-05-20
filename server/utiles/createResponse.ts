export function createResponse(body: object, statusCode: number, headers = {"Content-Type": "application/json"}) {
    return {
        headers,
        statusCode,
        body,
    };
}