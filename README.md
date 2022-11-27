# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website. This api is helpful in getting detailed information about Bootcamps programs, eg- what courses they offer, fees, their ratings, job-guarantee programs, etc. One can get details based on distance from his location also.

## Features
- Advanced Query (Pagination, filter, etc) with custom class
- MongoDB Geospatial Index / GeoJSON
- Geocoding
- Aggregation
- Photo Upload
- Models & Relationships
- Middleware (Express & Mongoose)
- Custom Error Handling
- User Roles & Permissions
- Authentication With JWT & Cookies
- Emailing Password Reset Tokens
- Custom Database Seeder Using JSON Files
- Password & Token Hashing
- Security: NoSQL Injection, XSS, etc
- Documentation with docgen utility html file

## Usage

Update the values/settings in .env file
```

NODE_ENV=production
PORT=5000

MONGO_URI= your mongo uri

GEOCODER_PROVIDER=mapquest
GEOCODER_API_KEY= your geocoder api key (require account on mapquest)

FILE_UPLOAD_PATH= ./public/uploads
MAX_FILE_UPLOAD=1000000

JWT_SECRET= your jwt secret
JWT_EXPIRE=60d
JWT_COOKIE_EXPIRE=30

```

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
npm run d

# Import all data
npm run i
```

## Demo

Extensive documentation with examples [here](https://documenter.getpostman.com/view/20805847/2s8YerNY1c)

- Version: 1.0.0
![2022-11-27 (1)](https://user-images.githubusercontent.com/88419331/204124658-0d826465-17ac-4bb5-a8fa-a7e605fafb1f.png)

