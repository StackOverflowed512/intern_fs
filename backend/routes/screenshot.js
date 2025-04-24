const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-core");

router.post("/", async (req, res) => {
    let browser = null;
    try {
        const { html, css } = req.body;

        const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;

        // For Render.com - use their Chromium path
        // For local development, you'll need to specify your Chrome path
        const executablePath = process.env.RENDER
            ? "/opt/render/.cache/chromium/chrome"
            : "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

        // Launch browser
        browser = await puppeteer.launch({
            executablePath: executablePath,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--single-process",
                "--disable-gpu",
            ],
            headless: "new",
            defaultViewport: {
                width: 1200,
                height: 1600,
                deviceScaleFactor: 2,
            },
        });

        const page = await browser.newPage();
        await page.setContent(fullHtml, { waitUntil: "networkidle0" });
        await page.waitForTimeout(500);

        // Take screenshot
        const screenshot = await page.screenshot({
            type: "png",
            fullPage: true,
            omitBackground: true,
            encoding: "binary",
        });

        res.set("Content-Type", "image/png");
        res.set(
            "Content-Disposition",
            'attachment; filename="climate-infographic.png"'
        );
        res.send(screenshot);
    } catch (error) {
        console.error("Error generating screenshot:", error);
        res.status(500).json({
            error: "Failed to generate screenshot",
            details: error.message,
            suggestion: process.env.RENDER
                ? "Ensure Chromium is available at /opt/render/.cache/chromium/chrome"
                : "Make sure Chrome is installed at default location",
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

module.exports = router;
