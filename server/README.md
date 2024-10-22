# Star Wars Character Comparison Tool API Server

This project is the **API server** for the Star Wars Character Comparison Tool, built with **Express** and **TypeScript**. The server acts as an intermediary between the client and a third-party API, formatting the data for proper usage.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Running the Application](#running-the-application)

## Installation

### Prerequisites

- **Node.js** version `20.18.0` or higher
- Ensure the **Client application** is running to fetch character data.

### Steps

1. Clone this repository.

   git clone <https://github.com/JustinCPeel/SWAPI-Practise.git>

2. Navigate to the server folder.
   `cd server`

3. Install dependencies using npm.
   `npm install`

## Project Structure

The project is structured as follows:

```
root/
├── client/
│    ├── public/
│    └── src/
│    └── package.json
├── server/
│    └── src/
│    │    ├── controllers/ 
│    │    ├── dto/
│    │    ├── routes/
│    │    ├── services/
│    │    └── tests
│    └── package.json
```

## Features

- **Intermediary API:** Acts as a bridge between the client and a third-party API to format data appropriately.
- **Endpoints Listing:** Easily view available API endpoints.
- **CORS Support:** Cross-Origin Resource Sharing enabled for API access from the client.

## Technologies Used

- **Express:** Web framework for Node.js
- **TypeScript:** Superset of JavaScript for better type safety
- **Axios:** Promise-based HTTP client for making API requests
- **CORS:** Middleware to enable CORS
- **Jest:** Testing framework
- **ts-node:** TypeScript execution environment for Node.js

## Running the Application && Available Scripts

Make sure the Server application is up and running (necessary for character data).

In the server directory, you can run:

### npm run dev

Launches the server and exposes api endpoints to the client

### npm test

Launches the **jest** to test functionality within the server