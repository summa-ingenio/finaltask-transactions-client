# Bitcoin Arbitrage Rate Application

## What is Arbitrage Rate?

### Overview

Arbitrage rate refers to the percentage difference in the price of a financial instrument, such as Bitcoin, between two markets. In the context of this application, we focus on the arbitrage rate between Bitcoin prices in the United States and South Africa.

### Understanding Arbitrage

Arbitrage is a trading strategy that takes advantage of price discrepancies for the same asset in different markets. Traders seek to profit from these differences by buying the asset in the market where it is priced lower and selling it in the market where it is priced higher.

### Bitcoin Arbitrage Rate

The Bitcoin Arbitrage Rate is a key metric calculated as follows:

\[ \text{Arbitrage Rate} = \left( \frac{\text{Price in Market A} - \text{Price in Market B}}{\text{Price in Market B}} \right) \times 100 \]

- If the arbitrage rate is positive, it indicates an opportunity for profit.
- If the arbitrage rate is negative, it implies a potential loss.

### How Users Benefit

For users of this application, monitoring the Bitcoin arbitrage rate provides valuable insights into market trends and potential opportunities for trading. Users can make informed decisions on when to buy or sell Bitcoin based on real-time data, maximizing their potential profits.

## System Architecture

### Web Stack

The application will be developed using the following web stack:

- **Frontend Framework**: React.js

  - I will use Create React App (CRA) for its simplicity and quick setup, enabling a faster development process.
  - Styling will be done using Styled Components for a modular and maintainable styling approach. Global CSS files will be used to style multiple components.

- **Backend Framework**: Express.js

  - Express.js is chosen for its lightweight and flexible nature, making it suitable for building RESTful APIs.
  - MongoDB will be used as the database for its scalability and ease of integration with Node.js.

- **Database**: MongoDB
  - MongoDB is selected as the database due to its flexibility with JSON-like documents, which aligns well with the nature of the data in this application.

### Deployment

The application will be deployed using a cloud platform, such as Heroku, to ensure scalability and availability. Continuous integration and continuous deployment allows us to utilise test branches before pushing the application to the main branch for deployment.

## System Requirements Specification

### Overview

The Bitcoin Arbitrage Rate Application aims to provide users with real-time information about the arbitrage rates between Bitcoin prices in the United States of America and South Africa. Users can register, log in, and manage their transactions.

### User Stories

1. **User Information**

   - As a new user, I want to be able to quickly determin the arbitrage rate between the 2 currencies.

2. **User Login**

   - As a registered user, I want to log in to my account securely to view my own transactions.

3. **View Arbitrage Rates**

   - As a user, I want to view the current Bitcoin arbitrage rate between the United States of America and South Africa.

4. **Add Transactions**

   - As a user, I want to add my Bitcoin transactions, including the purchase price and date and abitrage rate.

5. **Edit Transactions**

   - As a user, I want to be able to edit the details of my existing transactions.

6. **Delete Transactions**
   - As a user, I want to delete transactions that are no longer relevant.

### Similar Software

While there are existing tools that provide Bitcoin price information, our application differentiates itself by focusing specifically on the arbitrage rates between the United States of America and South Africa. It offers a user-friendly interface for managing transactions and provides real-time data for informed decision-making.

### Functional Requirements

1. User Authentication

   - Registration with unique username and password
   - Secure login functionality

2. Transaction Management

   - Add new transactions with purchase price and date
   - Edit existing transactions
   - Delete transactions

3. Real-time Arbitrage Rates
   - Display current Bitcoin arbitrage rates

### Non-functional Requirements

1. **Performance**

   - Application should load quickly and respond promptly to user actions.

2. **Security**

   - User authentication and transactions should be securely handled.
   - Data encryption during transmission.

3. **Scalability**

   - The system should handle an increasing number of users and transactions without a significant decrease in performance.

4. **Reliability**

   - Ensure the application is available and reliable, minimizing downtime.

5. **Compatibility**

   - Support for major web browsers (Chrome, Firefox, Safari).

6. **Usability**

   - Intuitive user interface for easy navigation and understanding.

7. **Maintainability**
   - Codebase should be well-organized and documented for ease of maintenance.

## Getting Started

### Installation

#### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/summa-ingenio/bitcoin-arbitrage
   cd pricing server
   cd transactions-client
   cd transactions-sever

   ```

2. Install dependencies for both frontend and backend using `npm install`.
3. Configure MongoDB connection. (For the Purposes of this task the DB URL & JWT Auth token will be provided)
4. Run the application using `npm start` for both frontend and backend.
5. Please note there are 3 folders that will be required to install and run this application

### Enviroment Variables

Please set your eveniroment variables. For the purposes of this task the URI and Secret Key will be provided.

```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET_KEY=your_secret_key
```

### Security Measures

User passwords are stored securely using bcrypt for hashing.
JSON Web Tokens (JWT) are used for authentication.
Environment variables are used for sensitive information like MongoDB URI and JWT secret key.

### Third-Party APIs

The application uses the following third-party APIs:

Kraken API for fetching USD exchange rates. https://docs.kraken.com/rest/
Luno API for fetching ZAR exchange rates. https://www.luno.com/en/developers/api

### Deployment

The application is deployed on Heroku. Both the front end and back end are deployed together to simplify the deployment process. This decision was made for ease of management and simplicity in handling a small-scale application.

For a production deployment, consider securing sensitive information, implementing HTTPS, and other security best practices.

### Admin

Please note that for this task we have an admin dashboard which will allow you to view all the registered users of the aplication.

To test the admin dashboard please use the following details:

Username: caleb@gmail.com
Password: test

## Deployment URL

https://finaltask-client-139e56f14968.herokuapp.com/
