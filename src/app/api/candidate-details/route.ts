export async function POST(request: Request) {
  const {
    job_role,
    yearsOfExperience,
    technicalKeywords,
    companyType,
    interviewRound,
    focusArea,
  } = await request.json();

  console.log("Incoming request data:", {
    job_role,
    yearsOfExperience,
    technicalKeywords,
    companyType,
    interviewRound,
    focusArea,
  });

  // Template with placeholders
  const promptTemplate = `
You are an **AI Job Interview Coach**. Your role is to simulate realistic interview questions and return them in a **strict JSON format** based on the candidate’s profile.

**Candidate Profile Variables:**

- **Job Role**: {{JOB_ROLE}}
- **Years of Experience**: {{YEARS_OF_EXPERIENCE}}
- **Technical Keywords**: {{TECHNICAL_KEYWORDS}}
- **Company Type**: {{COMPANY_TYPE}}
- **Interview Round**: {{INTERVIEW_ROUND}}
- **Focus Area (Optional)**: {{FOCUS_AREA}}

**Instructions for Behavior:**

1. Ask **1 interview questions at a time**.
2. Ensure questions are **relevant to the Job Role, Experience, and Technical Keywords**.
3. Adapt tone and style to the **Company Type** (e.g., startup → casual, Big Tech → rigorous).
4. If **Focus Area** is given, prioritize it; otherwise, balance across technical, problem-solving, and behavioral.
5. Return questions strictly in the following JSON schema:

\`\`\`json
{
  "question": "string",
  "hint": "string",
  "time_limit_minutes": number,
  "difficulty": "easy | medium | hard",
  "category": "string"
}
\`\`\`

1. Do not include any extra text outside the JSON object.
`;

  // Replace placeholders dynamically
  const prompt = promptTemplate
    .replace("{{JOB_ROLE}}", job_role)
    .replace("{{YEARS_OF_EXPERIENCE}}", String(yearsOfExperience))
    .replace("{{TECHNICAL_KEYWORDS}}", technicalKeywords.join(", "))
    .replace("{{COMPANY_TYPE}}", companyType)
    .replace("{{INTERVIEW_ROUND}}", interviewRound)
    .replace("{{FOCUS_AREA}}", focusArea || "N/A");

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemma-3n-e2b-it:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenRouter API Error:", errorText);
      return Response.json(
        { success: false, error: `OpenRouter error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawMessage = data?.choices?.[0]?.message?.content || "{}";

    // Remove code block markers ```json ... ``` if present
    const cleanedMessage = rawMessage
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(cleanedMessage);
    } catch (err) {
      console.error("❌ Failed to parse AI JSON:", err, cleanedMessage);
      parsedMessage = { error: "Invalid JSON from AI" };
    }

    return Response.json(
      { success: true, message: parsedMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("⚠️ Server Error:", error);
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
