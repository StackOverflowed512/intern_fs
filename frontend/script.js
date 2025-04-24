document
    .getElementById("screenshot-btn")
    .addEventListener("click", async () => {
        const infographic = document.getElementById("infographic");
        const button = document.getElementById("screenshot-btn");

        // Show loading state
        button.disabled = true;
        button.textContent = "Generating...";

        try {
            // Get the HTML content of the infographic
            const htmlContent = infographic.outerHTML;
            const cssContent = await fetch("style.css").then((res) =>
                res.text()
            );

            // Send to backend for screenshot generation
            const response = await fetch(
                "http://localhost:3000/api/screenshot",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        html: htmlContent,
                        css: cssContent,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to generate screenshot");
            }

            // Get the image blob and create download link
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "climate-infographic.png";
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error generating screenshot:", error);
            alert("Failed to generate screenshot. Please try again.");
        } finally {
            // Reset button state
            button.disabled = false;
            button.textContent = "Download Infographic";
        }
    });
