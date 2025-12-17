
## Wallet Service

A simple Wallet API built for creating wallets, funding, transferring funds, and viewing wallet details.


## Features

- Create Wallet

- Fund Wallet

- Transfer Between Wallets

- Fetch Wallet Details + Transaction History


## Setup Instructions

Clone the repository

git clone https://github.com/Dianaiminza/walletservice.git
cd wallet-service


## Install dependencies

npm install


## Run the server

npm run start:dev


Access Swagger UI

http://localhost:3000/api/docs

## API Endpoints
Method	Endpoint	Description	Body / Params / Headers
POST	/wallets	Create a wallet	{ "currency": "Naira" }
POST	/wallets/:id/fund	Fund a wallet	{ "amount": 500 }
Header: Idempotency-Key optional
POST	/wallets/transfer	Transfer funds between wallets	{ "fromWalletId": "...", "toWalletId": "...", "amount": 100 }
GET	   /wallets/:id	  Get wallet details and transaction history	Path param: id
