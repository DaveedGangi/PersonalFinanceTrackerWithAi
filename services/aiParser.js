// services/aiParser.js
const OpenAI = require("openai");

// Initialize client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Parse natural language transaction input
 * @param {string} text
 * @returns {Object} { amount, category, description }
 */
async function parseTransaction(text) {
  const prompt = `
Extract the transaction details from this text: "${text}"
Return JSON in the format: {"amount": <number>, "category": "<category>", "description": "<description>"}
`;

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_tokens: 150,
  });

  //const message = response.choices[0].message.content;

  let message = response.choices[0].message.content.trim();

// Remove code block markers if present
if (message.startsWith("```")) {
  message = message.replace(/```json|```/g, "").trim();
}


  try {
    const parsed = JSON.parse(message);
    return parsed;
  } catch (err) {
    throw new Error("Failed to parse AI response: " + message);
  }
}

module.exports = parseTransaction;
