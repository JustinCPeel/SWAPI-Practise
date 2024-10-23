# Star Wars Character Comparison Tool Media Download Helper

This project is the **Helper class** for the Star Wars Character Comparison Tool, built with **Vanilla JS**. The helpers acts as a resource provider by downloading images based on character names and reverse lookup against an external API. The downlaoded files are in the git ignore to prevent bloating as the images are stored in the **client** application. All images downloaded are in **.webp** format.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Running the Application](#running-the-application)

## Installation

### Prerequisites

- **Node.js** version `20.18.0` or higher

### Steps

1. Clone this repository.

   git clone <https://github.com/JustinCPeel/SWAPI-Practise.git>

2. Navigate to the helper folder.
   `cd helper`

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
├── helper/
│    ├── downloads/
│    └── imageDownload.js
│    └── package.json
└── server/
    ├── src/
    │    ├── controllers/
    │    ├── dto/
    │    ├── routes/
    │    ├── services/
    │    └── tests
    └── package.json
```

## Features

- **Collects data:** Connects to both API services (Akabab and SWAPI) and prefetches a list of all characters.
- **Compares string values:** Compares the lists of characters and grabs the most relevant in comparison with a media link from teh Akabab API.
- **Download** Downloads the images in a directory,if the directory is not found it will create it and store the images with character names as media links, any failing images will be in the terminal as bad requests by axios and should be manually retrieved to keep consistancy of data.


## Technologies Used

- **String Similarity:** Library for comparing strings
- **Axios:** Promise-based HTTP client for making API requests
- **fs**

## Running the Application && Available Scripts


In the server directory, you can run:

### npm run download

Launches the helper function and downloads the images.

