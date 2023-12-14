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

//READ ME FRONT END

# Last Chance: Seize the Moment App

Introducing Last Chance, the ultimate platform for sharing and discovering exciting reservations! Our app empowers users to post reservations they can no longer attend, providing a second chance for others to enjoy memorable experiences.
Whether it's a dinner reservation, a movie screening, or a concert & dance party, Last Chance ensures that no plans goes to waste. Users can post and purchase reservations within a week of the reservation date, fostering a community of spontaneous adventures and making sure every event becomes a highlight of someones day.
Join Last Chance and embrace the joy of turning missed plans into last-minute fun!

# Front-end Dependencies

# React and Styling

React: v18.2.0
React DOM: v18.2.0
@emotion/react: v11.11.1
@emotion/styled: v11.11.0
@mui/material: v5.14.20
@mui/icons-material: v5.14.19
react-cool-onclickoutside: v1.7.0
react-countdown: v2.3.5
react-dotenv: v0.1.3
react-geocode: v1.0.0-alpha.1
react-google-autocomplete: v2.7.3
react-google-places-autocomplete: v4.0.1
react-horizontal-scroll: v6.0.0
use-places-autocomplete: v4.0.1

# Routing and State Management

react-router-dom: v6.18.0
react-redux: v8.1.3
@reduxjs/toolkit: v1.9.7
API and Data Handling
@react-google-maps/api: v2.19.2
google-map-react: v2.2.1
react-axios: (add version if applicable)
Authentication and Security
jsonwebtoken: v9.0.2
bcrypt: v5.1.1

# Utility

react-google-places-autocomplete: v4.0.1
react-horizontal-scroll: v6.0.0
react-redux: v8.1.3
Development Dependencies
TypeScript Types for React: v18.2.15
Eslint: v8.45.0
Nodemon: v3.0.1
Prisma (ORM): v5.5.2
Vite (Front-end Build Tool): v4.4.5
