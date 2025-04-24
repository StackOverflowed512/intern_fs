const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer-core");
const os = require("os");

router.post("/", async (req, res) => {
    let browser;
    try {
        const { html, css } = req.body;

        const fullHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                ${html}
            </body>
            </html>
        `;

        // Determine the correct Chromium/Chrome path based on OS
        let executablePath;
        if (os.platform() === "win32") {
            // Windows paths - adjust these based on where Chrome is installed
            executablePath =
                "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" ||
                "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
        } else {
            // Linux/Mac paths (for when you deploy)
            executablePath =
                process.env.CHROMIUM_PATH ||
                "/usr/bin/chromium-browser" ||
                "/usr/bin/chromium" ||
                "/usr/bin/google-chrome";
        }

        // Launch Puppeteer
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
        });

        const page = await browser.newPage();
        await page.setContent(fullHtml, { waitUntil: "networkidle0" });
        await page.waitForTimeout(500);

        const screenshot = await page.screenshot({
            type: "png",
            fullPage: true,
            omitBackground: true,
            encoding: "binary",
        });

        res.set("Content-Type", "image/png");
        res.set(
            "Content-Disposition",
            'attachment; filename="infographic.png"'
        );
        res.send(screenshot);
    } catch (error) {
        console.error("Error generating screenshot:", error);
        res.status(500).json({
            error: "Failed to generate screenshot",
            details: error.message,
            suggestion:
                "Make sure Chrome/Chromium is installed and the executablePath is correct",
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
});

module.exports = router;
