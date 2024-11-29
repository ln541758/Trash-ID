const apiKey = process.env.EXPO_PUBLIC_mapsApiKey;

export async function analyzeImage(uri) {
  try {
    console.log("Starting analyzeImage function...");
    console.log("Image URI:", uri); // 检查传入的图片 URI

    const base64 = await fetch(uri)
      .then((response) => {
        console.log("Image fetch response status:", response.status); // 检查 fetch 的状态码
        return response.blob();
      })
      .then((blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.split(",")[1]);
          };
          reader.onerror = (err) => {
            console.error("Error during Base64 conversion:", err);
            reject(err);
          };
          reader.readAsDataURL(blob);
        });
      });

    console.log("Base64 Data (first 50 characters):", base64.substring(0, 50));

    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64 },
              features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
            },
          ],
        }),
      }
    );

    console.log("Vision API request sent.");
    console.log("API Response status:", response.status);

    const data = await response.json();
    console.log("Vision API response data:", data);

    if (!data.responses || !data.responses[0].labelAnnotations) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    const labels = data.responses[0].labelAnnotations.map(
      (label) => label.description.toLowerCase()
    );
    console.log("Extracted Labels:", labels);

    return labels;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return [];
  }
}
