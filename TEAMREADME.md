#Start

- Dont have new branch "git checkout -b yourbranch".
- Have branch go to yourbranch "git checkout yourbranch" and then "git merge main"
- if main have any update, go to main branch 'git pull' then switch to yourbranch "git merge manin"
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
  - username and password are unique

# User

- Base URL : localhost:3000/api/user
- Get " /profile " get user information
- Get "/reservation" get item add to cart
- Get "/paymenthistory" get user payment history information
- Get "/sellitem" get all sell item of User
- POST "/reservation/:itemId" add item to cart
  - required item id
- DELETE "/reservation/:id" delete item of cart
- required id

# Item

- Base URL : localhost:3000/api/tickets
- POST "/create" create tickets
  - Data required :{ title, description, time, price, address1, address2, city, state, zip, country }
  - Dont have address2 : example : address2 =" "
  - title should be have 3 option (restaurant,movies,concert)
- GET "/" get all tickets
- GET "/restaurant" get all restaurant tickets
- GET "/movies"
- GET "/concert"
- GET "/:id" get single ticket
  - requried id
- DELETE "/delete/:id"

  - requried id

- Any issue send me to slack
