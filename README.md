# Climate Change Infographic

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed Application](https://img.shields.io/badge/Deployed-Live-brightgreen)](https://intern-fs.onrender.com)

## Overview

This project is a web-based interactive infographic visualizing critical climate change data. It presents key statistics, primary causes, and projected impacts of climate change in a user-friendly and engaging format. A standout feature is the ability to download the infographic as a PNG image, achieved through a robust backend screenshot generation service.

**Key Features:**

-   **Data Visualization:** Presents complex climate data (temperature rise, CO2 levels, ice loss, sea-level rise) in an easily digestible visual format.
-   **Interactive Elements:** Clean, modern design with hover effects to enhance user engagement.
-   **Dynamic Screenshot Generation:** Enables users to download a high-quality PNG of the infographic. This is powered by a backend service using Puppeteer and Chromium.
-   **Responsive Design:** The infographic adapts seamlessly to various screen sizes, ensuring a consistent user experience across devices.
-   **Real-world Relevance:** Addresses a crucial global issue, demonstrating awareness of current affairs and the ability to present data effectively.

## Technologies Used

-   **Frontend:**
    -   HTML5: Structure of the infographic.
    -   CSS3: Styling and layout, including responsive design and animations.
    -   JavaScript: Frontend interactivity and triggering the screenshot download.
-   **Backend:**
    -   Node.js: Server-side runtime environment.
    -   Express: Web framework for handling API requests.
    -   Puppeteer-core: Node library to control Chromium for generating screenshots.
    -   @sparticuz/chromium: Provides a Chromium distribution suitable for serverless environments.
    -   cors: Middleware to enable Cross-Origin Resource Sharing.
-   **Deployment:**
    -   Render: Platform for hosting the frontend and backend applications.

## Project Architecture

The project follows a client-server architecture:

1.  **Frontend (Client):**

    -   The `index.html`, `style.css`, and `script.js` files provide the user interface and interactivity.
    -   When the "Download Infographic" button is clicked, JavaScript sends a request to the backend API with the HTML and CSS of the infographic.

2.  **Backend (Server):**
    -   The Node.js server (using Express) receives the request.
    -   The `/api/screenshot` route handles the screenshot generation.
    -   Puppeteer launches a headless Chromium instance.
    -   The infographic's HTML and CSS are rendered in Chromium.
    -   Puppeteer takes a screenshot of the rendered page.
    -   The server sends the screenshot image back to the client.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <https://github.com/StackOverflowed512/intern_fs>
    cd <backend>
    ```

2.  **Install dependencies (both frontend and backend):**

    ```bash
    npm install
    ```

3.  **Install Chromium (for screenshot generation):**

    ```bash
    npm run install-chromium
    ```

4.  **Run the server:**

    ```bash
    npm start
    ```

    The server will start at `http://localhost:3000` (or the port specified in your `.env` file).

5.  **Access the frontend:**

    Open `index.html` in your browser, or if running the server, navigate to `http://localhost:3000`.

## API Endpoints

-   `/api/screenshot` (POST): Generates a screenshot of the infographic.
    -   Requires a JSON payload with `html` and `css` properties.
    -   Returns a PNG image.
-   `/health` (GET): A health check endpoint to verify the server is running. Returns `{ "status": "ok" }`.

## Deployment

The application is deployed on Render:

-   **Frontend URL:** [https://intern-fs.onrender.com](https://intern-fs.onrender.com)
-   The Render setup includes environment variables for any sensitive configurations (if applicable).

## Potential Improvements

-   **Data Updates:** Implement a mechanism to fetch the latest climate data from external APIs.
-   **Interactive Charts:** Replace static elements with dynamic charts using libraries like Chart.js or D3.js for enhanced user interaction.
-   **User Customization:** Allow users to select different climate variables or timeframes.
-   **Error Handling:** Implement more robust error handling and logging, both on the client and server sides.
-   **Accessibility:** Improve accessibility by adhering to WCAG guidelines.
-   **Testing:** Add unit and integration tests to ensure code reliability.

## Author

\[Omkar Mutyalwar]

## Acknowledgements

-   Data sources: NASA, IPCC, NOAA
-   Inspiration from various climate change awareness initiatives.
