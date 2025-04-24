const chromium = require("@sparticuz/chromium");

(async () => {
    try {
        console.log("Starting Chromium installation...");
        await chromium.executablePath();
        console.log("Chromium is ready to use");
    } catch (error) {
        console.error("Error installing Chromium:", error);
        process.exit(1);
    }
})();
