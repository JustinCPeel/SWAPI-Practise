
# Star Wars Character Comparison Tool
The **Star Wars Character Comparison Tool** is a comprehensive application designed to allow users to compare characters from the Star Wars universe. It consists of three main components: the API server, the React client, and a media download helper.

## Overview of Components
### API Server
The API Server is built with Express and TypeScript. It acts as an intermediary between the client application and a third-party API, formatting the data for proper usage. Key features include:

- Provides endpoints for character data retrieval.
- Implements CORS support for cross-origin requests.
- Facilitates testing using Jest.

### React Client
The React Client enables users to select and compare two Star Wars characters in an animated modal. Built with React and TypeScript, it features:

- A responsive user interface with animated transitions.
- Character selection with attribute comparison.
- Integration with the API server to fetch character data.
- Utilizes Sass for modular styling.

### Media Download Helper
The Media Download Helper is a Vanilla JavaScript utility that downloads character images based on their names. It connects to multiple API services to gather data and supports:

- Image downloading in .webp format.
- String comparison to match character names with media links.
- Automatic directory creation for image storage.
- Technologies Used
- The project employs a variety of technologies, including:

- Backend: Node.js, Express, TypeScript, Axios
- Frontend: React, TypeScript, Framer Motion, Sass
- Helper: Vanilla JS, Axios, String Similarity
## Getting Started

To get started with the project, ensure you have Node.js version 20.18.0 or higher. Clone the repository, and follow the installation instructions provided in each component's README.
- [Client Readme](./client/README.md)
- [Server Readme](./server/README.md)
- [Helper Readme](./helper/README.md)
