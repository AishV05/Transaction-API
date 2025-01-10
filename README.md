# Transaction API
This API is live and running on https://transaction-api-vjcq.onrender.com/
* To run on local machine follow Installation steps.
## Overview
The Transaction API is built using Node.js and MongoDB to handle user transactions with support for filtering, pagination, and aggregation. It provides endpoints to retrieve user details, transactions for specific users, and all transactions with user details.

## Prerequisites
1. Node.js (v14 or later)
2. MongoDB Atlas or Local MongoDB setup
3. Postman or any API client for testing

## Installation and Setup
### Clone the repository:

    git clone https://github.com/AishV05/Transaction-API.git
    cd Transaction-API
###  Install dependencies:

    npm install

### Configure MongoDB connection:

    Use either mongodb local or Atlas

### Populate .env file

    MONGO_URI=<your mondodb string>
    port = 3000 

### Seed the database with sample data:

    node seed.js


### Start the server:

    npm run dev
The server will run on http://localhost:3000
