import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisFormInput, AnalysisResult, BuildOption } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    dossier: {
      type: Type.OBJECT,
      properties: {
        companyName: { type: Type.STRING, description: "The official name of the company." },
        industry: { type: Type.STRING, description: "The primary industry the company operates in." },
        employeeCount: { type: Type.STRING, description: "The approximate range of employees (e.g., 1001-5000)." },
        overview: {
          type: Type.STRING,
          description: "A detailed summary of the company's business model, revenue streams, products, customers, and recent performance or news.",
        },
        keyContacts: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              role: { type: Type.STRING },
              email: { type: Type.STRING },
            },
            required: ["name", "role", "email"],
          },
          description: "A list of 3-5 key contacts or executives at the company, including their name, role, and email.",
        },
        recentNews: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    date: { type: Type.STRING, description: "Publication date in YYYY-MM-DD format." },
                    source: { type: Type.STRING, description: "Name of the news source." },
                },
                required: ["title", "summary", "date", "source"],
            },
            description: "A list of 3-5 recent news articles or events related to the company from the last 12 months."
        }
      },
      required: ["companyName", "industry", "employeeCount"],
    },
    useCases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A clear, descriptive title for the business use case." },
          problem: { type: Type.STRING, description: "A summary of the specific business problem or pain point this use case addresses." },
          solution: { type: Type.STRING, description: "A description of how a solution (e.g., managed Salesforce services) can solve the problem." },
          businessValue: { type: Type.STRING, description: "The tangible business value or outcomes the company can expect." },
          salesforceCapability: { type: Type.STRING, description: "The capabilities the proposed solution unlocks." },
          serviceOfferings: { type: Type.STRING, description: "Relevant service offerings." },
          successMetrics: { type: Type.STRING, description: "Key metrics to measure success (KPIs, ROI)." },
        },
        required: ["title", "problem", "solution", "businessValue", "salesforceCapability", "serviceOfferings", "successMetrics"],
      },
      description: "A list of 2-3 relevant business use cases.",
    },
    outreachTemplates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A descriptive title for the outreach template." },
          channel: { type: Type.STRING, description: "The intended channel, e.g., 'Email' or 'LinkedIn InMail'." },
          subject: { type: Type.STRING, description: "The subject line for the message." },
          body: { type: Type.STRING, description: "The full body of the outreach message. Use placeholders like [Contact Name] and [Company Name]." },
        },
        required: ["title", "channel", "subject", "body"],
      },
      description: "A list of 2-3 personalized outreach templates.",
    }
  },
};


function buildPrompt(inputs: AnalysisFormInput): string {
  const { companyName, buildOption } = inputs;

  const getRequestedSections = (option: BuildOption) => {
    const sections = [];
    if (option === 'All' || option === 'Account Dossier') {
      sections.push("- A full 'dossier' including overview, key contacts, and recent news.");
    }
    if (option === 'All' || option === 'Use Cases') {
      sections.push("- A list of relevant business 'useCases'.");
    }
    if (option === 'All' || option === 'Outreach Templates') {
      sections.push("- A list of personalized 'outreachTemplates'.");
    }
    return sections.join('\n');
  };

  const requestedSections = getRequestedSections(buildOption);

  return `
You are a Senior Strategy Consultant. Your task is to generate an Account Dossier for the target company, ${companyName}.
Your analysis must be sharp, insightful, and geared towards tangible business outcomes.
Conduct fresh and rigorous research, prioritizing sources from the last 12 months.

**Target Company:** ${companyName}

**Task:**
Generate a detailed analysis of the company. The output must be a single, valid JSON object that strictly adheres to the provided schema.

Your response MUST ALWAYS include a 'dossier' object containing the company's official name, industry, and employee count range.

Based on the user's request, please generate the following sections:
${requestedSections}

Adhere strictly to the JSON schema for the response. Only include the root properties for the sections requested. No extra text or explanations outside the JSON structure.
`;
}

export const generateCompanyAnalysis = async (inputs: AnalysisFormInput): Promise<AnalysisResult> => {
  try {
    const prompt = buildPrompt(inputs);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as AnalysisResult;

  } catch (error) {
    console.error("Error generating company analysis:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate company analysis: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating company analysis.");
  }
};