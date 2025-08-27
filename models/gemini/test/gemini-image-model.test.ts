import { expect, spyOn, test } from "bun:test";
import { GeminiImageModel } from "@aigne/gemini";

test("GeminiImageModel imagen model should work correctly", async () => {
  const model = new GeminiImageModel({
    apiKey: "YOUR_API_KEY",
    model: "imagen-4.0-generate-001",
  });

  spyOn(model["client"].models, "generateImages").mockResolvedValueOnce({
    generatedImages: [
      {
        image: {
          imageBytes: "base64",
        },
      },
    ],
  });

  const result = await model.invoke({ prompt: "Draw an image about a cat" });

  expect(result).toEqual(
    expect.objectContaining({
      images: [{ base64: "base64" }],
    }),
  );
});
