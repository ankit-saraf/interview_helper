const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')


const buildRouter = (admin) => {
  const router = AdminBroExpress.buildRouter(admin);
  return router;
}


module.exports = buildRouter;