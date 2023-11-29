const express = require("express");
const prisma = require("../../prisma");
const { title } = require("process");
const router = express.Router();
module.exports = router;
////** User must be logged in to access . */
router.use((req, res, next) => {
  if (!res.locals.user) {
    res.json({ error: "You must be logged in." });
    return next(new ServerError(401, "You must be logged in."));
  }
  next();
});
//get uers information
router.get("/profile", async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: res.locals.user.id,
      },
    });
    res.json({ message: "this is profile", data: user });
  } catch (err) {
    next(err);
  }
});
// get user reservation
router.get("/reservation", async (req, res, next) => {
  try {
    const reservation = await prisma.reservation.findMany({
      where: {
        userId: res.locals.user.id,
      },
    });
    // console.log(reservation);
    if (!reservation.length > 0) {
      res.json({
        message: `User ${res.locals.user.firstName} dont have reservation`,
      });
      return;
    }
    // const newItem = [];
    // for (rsv of reservation) {
    //   console;
    //   const item = await prisma.item.findUnique({
    //     where: {
    //       id: rsv.itemId,
    //     },
    //   });
    //   // console.log(item);
    //   newItem.push(item);
    //   // console.log(newItem);
    // }
    res.json({ data: reservation });
  } catch (err) {
    next(err);
  }
});
//Get order
router.get("/order", async (req, res, next) => {
  try {
    const order = await prisma.order.findMany({
      where: { userId: res.locals.user.id },
    });
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
});
//Post order
router.post("/order", async (req, res, next) => {
  try {
    const {
      title,
      category,
      description,
      upload,
      time,
      address1,
      address2,
      city,
      state,
      country,
      zip,
    } = req.body;
    const price = +req.body.price;
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !upload ||
      !time ||
      !address1 ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      res.json({ message: "Missing information" });
      return;
    }
    const order = await prisma.order.create({
      data: {
        title,
        category,
        description,
        upload,
        price,
        time: new Date(time),
        address1,
        address2,
        city,
        state,
        zip,
        country,
        userId: res.locals.user.id,
      },
    });
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
});
//get payment history
router.get("/payment", async (req, res, next) => {
  try {
    res.json({ message: "this is paymenthistory" });
  } catch (err) {
    next(err);
  }
});
// get user sell item
router.get("/sellitem", async (req, res, next) => {
  try {
    const sellitem = await prisma.item.findMany({
      where: { userId: res.locals.user.id },
    });
    res.json({ data: sellitem });
  } catch (err) {
    next(err);
  }
});

//get some item to cart
router.post("/reservation/:itemId", async (req, res, next) => {
  try {
    //user params to get itemID
    const itemId = +req.params.itemId;
    //create new revation witht userid and item id
    const reservation = await prisma.reservation.create({
      data: { userId: res.locals.user.id, itemId },
    });
    // console.log(reservation);
    //update that item isResvation ti true
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        isReservation: true,
      },
    });
    //check if revevation true then res
    if (reservation) {
      res.json({ message: "this is add reservation", data: reservation });
    }
  } catch (err) {
    next(err);
  }
});
router.delete("/reservation/:id", async (req, res, next) => {
  try {
    //check id
    if (!req.params.id) {
      res.json({ error: "need reservation ID" });
      return;
    }
    const id = +req.params.id;
    //delete with id
    const deletReservation = await prisma.reservation.delete({
      where: { id },
    });
    await prisma.item.update({
      where: { id: deletReservation.itemId },
      data: {
        isReservation: false,
      },
    });
    res.json({ message: "this is delete resvation", data: deletReservation });
  } catch (err) {
    next(err);
  }
});
