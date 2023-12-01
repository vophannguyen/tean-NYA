# Start

- Dont have new branch "git checkout -b yourbranch".
- Have branch go to yourbranch "git checkout yourbranch" and then "git merge main"
- if main have any update, go to main branch 'git pull' then switch to yourbranch "git merge main"
- npm i
- npx prisma migrate reset
- "npm run dev" sever
- "npm run start" for vite

# Backend fetch data

# AUTH

- Base URL : localhost:3000/api/auth
- POST "/login"
  - Data required: {username, password}
- POST "/register"
  - Data required :{username, password, email, phone, name}
  - username and email are unique

# User

-Note : Need logged to fetch data

- Base URL : localhost:3000/api/user
- Get " /profile " get user information
- Get "/reservation" get items that are add to cart
- Get "/payment" get user payment information method saved in profile
- Get "/sellitem" get all sell item of User (posted reservations of the user)
- POST "/reservation/:itemId" add item to cart
  - required item id
- DELETE "/reservation/:id" delete item of cart
  - required id
- Get "/solditem" get all sold item of User
- POST "/solditem" put sold item of user to backend
  - Date: {title,description,time,upload,category,price}
- GET "/order" get user order history
- POST "/order" put user order to backend (completed checkout)
  - Data: {
    title,
    category,
    description,
    price,
    upload,
    time,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    },

# Item

- Base URL : localhost:3000/api/tickets
- POST "/create" create tickets Note: Need logged to create tickets
  - Data required :{ title, category,description, time, price, upload,address1, address2, city, state, zip, country }
  - Dont have address2 : example : address2 =" "
  - title should be have 3 option (restaurant,movies,concert)
- GET "/" get all tickets
- GET "/reservation" get all restaurant tickets
- GET "/movies"
- GET "/concert"
- GET "/:id" get single ticket
  - requried id
- DELETE "/delete/:id"

  - requried id

- Any issue send me to slack
