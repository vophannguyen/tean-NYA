const express = require("express");
const prisma = require("../../prisma");
const { title } = require("process");
const { create } = require("domain");
const { ServerError } = require("../../errors");
const { imageFile } = require("../tickets/image");
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
///////////////////////

//start//get user information
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
////////////////////////////////end//

//start/// get user reservation
router.get("/cart", async (req, res, next) => {
  try {
    const cart = await prisma.reservation.findMany({
      where: {
        userId: res.locals.user.id,
      },
      include: {
        item: true,
      },
    });
    // check we have any order in Cart
    if (!cart.length > 0) {
      res.json({
        message: `User ${res.locals.user.firstName} dont have reservation`,
      });
      return;
    }
    // cal order summary
    const orderSummary = { subTotal: 0, saleTax: 0, total: 0 };
    cart.forEach((data) => {
      orderSummary.subTotal += data.item.price * data.item.quantity;
    });
    orderSummary.saleTax = orderSummary.subTotal * 0.12;
    orderSummary.total = orderSummary.subTotal + orderSummary.saleTax;
    res.json({ data: cart, orderSummary });
  } catch (err) {
    next(err);
  }
});
///////////////////////////end///

//Start////////////Get order history
router.get("/order", async (req, res, next) => {
  let itemOrder = [];
  try {
    const order = await prisma.order.findMany({
      where: { userId: res.locals.user.id },
      include: { itemOrder: true, receipt: true },
    });
    order.forEach((data) => {
      itemOrder.push(...data.itemOrder);
    });
    if (itemOrder.length > 0) {
      itemOrder.forEach((ticket) => {
        ticket.upload = imageFile(ticket.upload);
      });
    }
    res.json({ data: order, itemOrder });
  } catch (err) {
    next(err);
  }
});
///////////////////end

// get receipt of order
router.get("/order/reciept/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const receipt = await prisma.order.findUnique({
      where: { id },
      include: { itemOrder: true, receipt: true },
      // include: { reciept: true },
    });
    res.json({ receipt });
  } catch (err) {
    next(err);
  }
});
///////////////////////////////end///
//start/////Create order history
router.post("/order", async (req, res, next) => {
  try {
    // check if we have all information
    if (req.body.cart.length <= 0) {
      res.json({ message: "Missing information" });
      return;
    }
    ///create order
    const order = await prisma.order.create({
      data: {
        userId: res.locals.user.id,
        itemOrder: {
          create: req.body.cart.map((cart) => ({
            title: cart.title,
            category: cart.category,
            description: cart.description,
            upload: cart.upload,
            time: cart.time,
            address1: cart.address1,
            address2: cart.address2,
            city: cart.city,
            state: cart.state,
            country: cart.country,
            zip: cart.zip,
            price: +cart.price,
            quantity: +cart.quantity,
          })),
        },
        receipt: {
          create: {
            subTotal: +req.body.receipt.subTotal,
            saleTax: +req.body.receipt.saleTax,
            total: +req.body.receipt.total,
          },
        },
      },
    });
    res.json({ data: order });
  } catch (err) {
    next(err);
  }
});
//////////////////////////////end//

//start/////get payment history
router.get("/payment", async (req, res, next) => {
  try {
    const payment = await prisma.payment.findMany({
      where: { userId: res.locals.user.id },
    });

    res.json({ data: payment });
  } catch (err) {
    next(err);
  }
});
///////////////////////end

//Start //////add payment method to table
router.post("/payment", async (req, res, next) => {
  try {
    const { method, nameOnCard, cardNumber, securityCode, experiedDay } =
      req.body;
    //Check make sure we have all information
    if (
      !method ||
      !nameOnCard ||
      !cardNumber ||
      !securityCode ||
      !experiedDay
    ) {
      res.json({ error: "Need All Information!" });
    }
    //create payment method
    const payment = await prisma.payment.create({
      data: {
        method,
        nameOnCard,
        cardNumber,
        securityCode,
        experiedDay,
        userId: res.locals.user.id,
      },
    });
    res.json({ data: payment });
  } catch (err) {
    next(err);
  }
});
/////////////////////////////end

//start / get sell item of user base on Item table
router.get("/sellitem", async (req, res, next) => {
  try {
    const sellitem = await prisma.item.findMany({
      where: { userId: res.locals.user.id },
    });
    sellitem.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: sellitem });
  } catch (err) {
    next(err);
  }
});
/////////////////////end

// get user sold item
router.get("/solditem", async (req, res, next) => {
  try {
    const solditem = await prisma.soldItem.findMany({
      where: { userId: res.locals.user.id },
    });
    solditem.forEach((ticket) => {
      ticket.upload = imageFile(ticket.upload);
    });
    res.json({ data: solditem });
  } catch (err) {
    next(err);
  }
});
/////////////////////////end///

// create sold item in soldItem table
router.post("/solditem", async (req, res, next) => {
  const { title, description, upload, category, userId, time } = req.body;
  const price = +req.body.price;
  //check all information required
  if (!title || !description || !upload || !time || !category || !price) {
    res.json({ error: "Need All Information" });
    return;
  }
  //check
  const solditem = await prisma.soldItem.create({
    data: {
      title,
      description,
      upload,
      time,
      category,
      price,
      userId,
    },
  });
  res.json({ data: solditem });
});
////////////////////////////end

//add sticket (item) to Cart
router.post("/cart/:itemId", async (req, res, next) => {
  try {
    //user params to get itemID
    const itemId = +req.params.itemId;
    //create new rervation witht userid and item id
    const cart = await prisma.reservation.create({
      data: { userId: res.locals.user.id, itemId },
      include: {
        item: true,
      },
    });
    //update that  isResvation: true in Item table
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        isReservation: true,
      },
    });
    //check if revevation true then res
    if (cart) {
      res.json({ message: "this is add reservation", data: cart });
    }
  } catch (err) {
    next(err);
  }
});
////////////////////end

//delete ticket (item)
router.delete("/cart/:id", async (req, res, next) => {
  try {
    //check id
    if (!req.params.id) {
      res.json({ error: "need reservation ID" });
      return;
    }
    const id = +req.params.id;
    //delete with id
    const deletCart = await prisma.reservation.delete({
      where: { id },
    });
    await prisma.item.update({
      where: { id: deletCart.itemId },
      data: {
        isReservation: false,
      },
    });
    res.json({ message: "this is delete resvation", data: deletCart });
  } catch (err) {
    next(err);
  }
});
/////////////////////end
