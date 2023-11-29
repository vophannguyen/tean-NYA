const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const router = require("express").Router();
const { imageFile, imageUpload } = require("./image");
module.exports = router;

////** User must be logged in to access . */
// router.use((req, res, next) => {
//   if (!res.locals.user) {
//     return next(new ServerError(401, "You must be logged in."));
//   }
//   next();
// });

//create new ticket
router.post("/create", imageUpload.single("upload"), async (req, res, next) => {
  try {
    // User must be logged in to access
    if (!res.locals.user) {
      res.json({ error: "You must be logged in." });
      return;
    }
    ///Check all information not null || all information required
    const { title, description, time } = req.body;
    const { address1, address2, city, state, zip, country } = req.body;
    //const string to float
    const price = +req.body.price;
    //check all information is not null
    if (!title || !description || !price || !req.file || !time) {
      res.json({ error: "all information required" });
      return;
    }
    if (!address1 || !address2 || !city || !state || !zip || !country) {
      res.json({ error: "Location information is required" });
      return;
    }
    //store upload image
    const { filename } = req.file;
    const upload = filename;
    //create newticket
    const newTicket = await prisma.item.create({
      data: {
        title,
        description,
        price,
        upload,
        userId: res.locals.user.id,
        time: new Date(time),
        location: {
          create: {
            address1,
            address2,
            city,
            state,
            zip,
            country,
          },
        },
      },
    });
    //new tickit undefind return
    if (!newTicket) {
      return;
    }
    // find location by item id
    const location = await prisma.location.findFirst({
      where: { itemId: newTicket.id },
    });
    ///send to fontend
    res.json({ item: newTicket, location });
  } catch (err) {
    next(err);
  }
});
///Get all tickets
router.get("/", async (req, res, next) => {
  try {
    //find all ticket no reservation yet
    const allTicket = await prisma.item.findMany({
      where: {
        isReservation: false,
      },
    });
    // find path of image and update upload
    allTicket.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: allTicket });
  } catch (err) {
    next(err);
  }
});
/// get restaurant ticket
router.get("/reservation", async (req, res, next) => {
  try {
    const allTicket = await prisma.item.findMany({
      where: { category: "reservation" },
    });
    if (allTicket.length <= 0) {
      res.json({ message: "No reservation" });
      return;
    }
    // find path of image and update upload
    allTicket.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: allTicket });
  } catch (err) {
    next(err);
  }
});
/// get all movies ticket
router.get("/movies", async (req, res, next) => {
  try {
    const allTicket = await prisma.item.findMany({
      where: { category: "movies" },
    });
    if (allTicket.length <= 0) {
      res.json({ message: "no movies ticket" });
      return;
    }
    // find path of image and update upload
    allTicket.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: allTicket });
  } catch (err) {
    next(err);
  }
});
/// get all concert ticket
router.get("/concert", async (req, res, next) => {
  try {
    const allTicket = await prisma.item.findMany({
      where: { category: "concert" },
    });
    if (allTicket.length <= 0) {
      res.json({ message: "no concert ticket" });
      return;
    }
    allTicket.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: allTicket });
  } catch (err) {
    next(err);
  }
});
////delete single item
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (!id) {
      res.json({ error: "Id not found" });
    }
    const deleteItem = await prisma.item.delete({
      where: {
        id,
      },
    });
    res.json({ data: deleteItem });
  } catch (err) {
    next(err);
  }
});
////get single ticket with id
router.get("/:id", async (req, res, next) => {
  try {
    id = +req.params.id;
    if (!id) {
      res.json({ error: "Id must be number" });
    }
    const ticket = await prisma.item.findFirst({
      where: { id },
    });
    const location = await prisma.location.findFirst({
      where: { itemId: id },
    });
    // find path of image and update upload
    if (!ticket) {
      res.json({ error: "Id not found" });
    }
    // console.log(imageFile(ticket.upload));
    ticket.upload = imageFile(ticket.upload);
    res.json({ data: ticket, location: location });
  } catch (err) {
    next(err);
  }
});
