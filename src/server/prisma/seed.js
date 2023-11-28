const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  await prisma.user.create({
    data: {
      username: "foo",
      password: "123",
      email: "vophannguyen@gmail.com",
      firstName: "Nguyen",
      lastName: "vo",
      items: {
        create: [
          {
            time: new Date().toJSON(),
            title: "restaurant",
            description: "test-desss",
            price: 10.0,
            upload: "1700626869150.png",
            location: {
              create: {
                address1: "1074 albany park dr",
                address2: " ",
                city: "fort mill",
                zip: "29715",
                state: "SC",
                country: "US",
              },
            },
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      username: "foo123",
      password: "123456",
      email: "vophannguyen1@gmail.com",
      firstName: "Nguyen",
      lastName: "vo",
      items: {
        create: [
          {
            time: new Date().toJSON(),
            title: "movies",
            description: "test-desss",
            price: 10.0,
            upload: "1700626869150.png",
            location: {
              create: {
                address1: "1074 albany park dr",
                address2: " ",
                city: "fort mill",
                zip: "29715",
                state: "SC",
                country: "US",
              },
            },
          },
        ],
      },
    },
  });
  await prisma.user.create({
    data: {
      username: "foo456",
      password: "123",
      email: "vophannguyen2@gmail.com",
      firstName: "Nguyen2",
      lastName: "vo2",
      items: {
        create: [
          {
            time: new Date().toJSON(),
            title: "concert",
            description: "test-desss",
            price: 10.0,
            upload: "1700626869150.png",
            location: {
              create: {
                address1: "1074 albany park dr",
                address2: " ",
                city: "fort mill",
                zip: "29715",
                state: "SC",
                country: "US",
              },
            },
          },
        ],
      },
    },
  });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
