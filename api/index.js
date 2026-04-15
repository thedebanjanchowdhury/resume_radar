const serverless = require("serverless-http");
const app = require("../server");

const handler = serverless(app);

export default async function (context, req) {
  return handler(context, req);
}
