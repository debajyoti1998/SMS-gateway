const koa = require("koa");

const koaRouter = require("koa-router"); // importing Koa-Router
const koaBody = require("koa-body");
const app = new koa();
const sendSms = require("./config/index");
const Response = require("./response");
const router = new koaRouter();
const userDatabase = [];
router.post("/users", koaBody(), async (ctx) => {
  const { email, password, phone } = ctx.request.body;
  const user = {
    email,
    password,
    phone,
  };

  userDatabase.push(user);
  const otp = Math.floor(Math.floor(Math.random() * 90000) + 10000).toString();
  const welcomeMessage = `Your verification code is ${otp}`;

  sendSms(user.phone, welcomeMessage);
  return Response.success(ctx, {
    statusCode: 200,
    code: 20,
    msg: "Account created successfully, kindly check your phone to activate your account!",
    data: user,
  });
});
app.use(router.routes()).use(router.allowedMethods()); // registering routes to the application

app.listen(3000, () => console.log(`server started http://localhost:3000`));
