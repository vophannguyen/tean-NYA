const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  for (let i = 1; i <= 10; i++) {
    await prisma.user.upsert({
      where: { username: "foo" + i },
      update: {},
      create: {
        username: "foo" + i,
        password: "123",
        email: "vophannguyen" + i + "@gmail.com",
        firstName: "Nguyen" + i,
        lastName: "vo",
        items: {
          create: [
            {
              time: new Date(
                Date.parse(new Date()) + 30 * 1000 * 60 * 60 * 24
              ).toJSON(),
              title: "restaurant" + i,
              category: "reservation",
              description: "test-desss",
              price: i,
              quantity: i,
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
        order: {
          create: [
            {
              time: new Date(
                Date.parse(new Date()) + 30 * 1000 * 60 * 60 * 24
              ).toJSON(),
              title: "restaurant" + i,
              category: "reservation",
              description: "test-" + i,
              price: i,
              upload: "1700626869150.png",
              address1: "1074 albany park dr",
              address2: " ",
              city: "fort mill",
              zip: "29715",
              state: "SC",
              country: "US",
            },
          ],
        },
        solditem: {
          create: [
            {
              title: "movies" + i,
              description: "test-" + i,
              price: i,
              upload: "1700626869150.png",
              time: new Date().toJSON(),
              category: "reservation",
            },
          ],
        },
      },
    });
    await prisma.user.upsert({
      where: { username: "foo123" + i },
      update: {},
      create: {
        username: "foo123" + i,
        password: "123456",
        email: "anna" + i + "@gmail.com",
        firstName: "Anna" + 1,
        lastName: "WaterHouse",
        items: {
          create: [
            {
              time: new Date(
                Date.parse(new Date()) + 30 * 1000 * 60 * 60 * 24
              ).toJSON(),
              title: "movies" + 1,
              category: "movies",
              description: "test-" + i,
              price: i,
              quantity: i,
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
        order: {
          create: [
            {
              time: new Date(
                Date.parse(new Date()) + 30 * 1000 * 60 * 60 * 24
              ).toJSON(),
              title: "movies" + i,
              category: "movies",
              description: "test-" + i,
              price: i,
              upload: "1700626869150.png",
              address1: "1074 albany park dr",
              address2: " ",
              city: "fort mill",
              zip: "29715",
              state: "SC",
              country: "US",
            },
          ],
        },
        solditem: {
          create: [
            {
              title: "restaurant" + i,
              description: "test-" + i,
              price: i,
              upload: "1700626869150.png",
              time: new Date().toJSON(),
              category: "movies",
            },
          ],
        },
      },
    });
    await prisma.user.upsert({
      where: { username: "foo456" + i },
      update: {},
      create: {
        username: "foo456" + i,
        password: "123",
        email: "yoona" + i + "@gmail.com",
        firstName: "Yoona",
        lastName: "Choi",
        items: {
          create: [
            {
              time: new Date(
                Date.parse(new Date()) + 30 * 1000 * 60 * 60 * 24
              ).toJSON(),
              title: "concert" + i,
              category: "concert",
              description: "test-" + i,
              price: i,
              quantity: i,
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
        order: {
          create: [
            {
              time: new Date(
                Date.parse(new Date()) + 30 * 1000 * 60 * 60 * 24
              ).toJSON(),
              title: "concert" + i,
              category: "concert",
              description: "test-" + i,
              price: i,
              upload: "1700626869150.png",
              address1: "1074 albany park dr",
              address2: " ",
              city: "fort mill",
              zip: "29715",
              state: "SC",
              country: "US",
            },
          ],
        },
        solditem: {
          create: [
            {
              title: "movies" + i,
              description: "test-" + i,
              price: i,
              upload: "1700626869150.png",
              time: new Date().toJSON(),
              category: "concert",
            },
          ],
        },
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
