import { AdminUrl } from "@/app/layout";

export async function POST(request) {
    try {
        const requestData = await request.json();

        // Convert request data to form-urlencoded format
        const formData = new URLSearchParams();
        Object.entries(requestData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(), // Convert form data to a string
        };

        const response = await fetch(
            `${AdminUrl}/wp-json/custom/v1/submit-ad-form`,
            requestOptions
        );

        // Check if the response is successful (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let responseData;

        try {
            // Attempt to parse the response as JSON
            responseData = await response.json();
        } catch (jsonError) {
            // If parsing fails, handle the error or set responseData to a default value
            console.error("Error parsing JSON response:", jsonError);
            responseData = { error: "Invalid JSON response" };
        }

        return new Response(JSON.stringify(responseData), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
