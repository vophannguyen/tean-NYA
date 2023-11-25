const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async create({ args, query }) {
        console.log(args);
        const password = await bcrypt.hash(args.data.password, 14);
        args.data.password = password;
        return query(args);
      },
    },
  },
});

module.exports = prisma;
