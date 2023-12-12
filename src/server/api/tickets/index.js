const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const router = require("express").Router();
const { imageFile, imageUpload } = require("./image");
module.exports = router;

//create new ticket ...require logged
router.post("/create", imageUpload.single("upload"), async (req, res, next) => {
  try {
    // User must be logged in to access
    if (!res.locals.user) {
      res.json({ error: "You must be logged in." });
      return;
    }
    console.log(req.body);
    ///Check all information not null || all information required
    const { title, description, time } = req.body;
    const { address1, address2, city, state, zip, country, category } =
      req.body;
    //const string to float
    const price = +req.body.price;
    const quantity = +req.body.quantity;
    //check all information is not null
    if (
      !title ||
      !description ||
      !price ||
      !time ||
      !category ||
      !req.file ||
      !quantity ||
      !address1 ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      res.json({ error: "all information required" });
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
        category,
        upload,
        quantity,
        userId: res.locals.user.id,
        time: new Date(time),
        address1,
        address2,
        city,
        state,
        zip,
        country,
      },
    });
    //new tickit undefind return
    if (!newTicket) {
      return;
    }
    // find location by item id
    ///send to fontend
    res.json({ data: newTicket });
  } catch (err) {
    next(err);
  }
});
//////////////////////////////end

///Get all tickets
router.get("/", async (req, res, next) => {
  try {
    //find all ticket no reservation yet
    const allTicket = await prisma.item.findMany({
      where: {
        isReservation: false,
      },
    });
    // find path of image and push to data base
    allTicket.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: allTicket });
  } catch (err) {
    next(err);
  }
});
//////////////////////////end

/// get category reservation ticket
router.get("/reservation", async (req, res, next) => {
  try {
    const allTicket = await prisma.item.findMany({
      where: { category: "reservation", isReservation: false },
    });
    ///check if we have reservation ticket
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
//////////////////////////end

/// get all movies ticket
router.get("/movies", async (req, res, next) => {
  try {
    const allTicket = await prisma.item.findMany({
      where: { category: "movies", isReservation: false },
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
///////////////////end

/// get all concert ticket
router.get("/concert", async (req, res, next) => {
  try {
    const allTicket = await prisma.item.findMany({
      where: { category: "concert", isReservation: false },
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
/////////////////////////////end
////NewYork [10162,10006,10004,10069,10282,10018,10007,10280,10005,10044,10017,10037,10012,10038,10001,10039,10013,10014,10036,10030,10010,10022,10035,10026,10021,10034,10019,10040,10028,10011,10003,10016,10128,10009,10032,10033,10031,10024,10027,10023,10002,10029,10025]
router.get("/city", async (req, res, next) => {
  const zipNewYork = [
    10162, 10006, 10004, 10069, 10282, 10018, 10007, 10280, 10005, 10044, 10017,
    10037, 10012, 10038, 10001, 10039, 10013, 10014, 10036, 10030, 10010, 10022,
    10035, 10026, 10021, 10034, 10019, 10040, 10028, 10011, 10003, 10016, 10128,
    10009, 10032, 10033, 10031, 10024, 10027, 10023, 10002, 10029, 10025,
  ];
  const allEvent = await prisma.item.findMany();
  const newYork = allEvent.filter((event) => {
    return zipNewYork.includes(+event.zip);
  });
  res.json({ NewYork: newYork });
});
//////////////end

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
////////////////////////////end

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
    // find path of image and update upload
    if (!ticket) {
      res.json({ error: "Id not found" });
    }
    ticket.upload = imageFile(ticket.upload);
    res.json({ data: ticket });
  } catch (err) {
    next(err);
  }
});
///////////////////end
