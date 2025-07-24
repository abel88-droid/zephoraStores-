'use server';
/**
 * @fileOverview A flow for generating order confirmation email content.
 * 
 * - generateConfirmationEmail - A function that creates the subject and body for a confirmation email.
 * - ConfirmationEmailInput - The input type for the flow.
 * - ConfirmationEmailOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ConfirmationEmailInputSchema = z.object({
  orderId: z.string().describe("The unique identifier for the order."),
  customerName: z.string().describe("The name of the customer who placed the order."),
  items: z.array(z.object({
    name: z.string().describe("The name of the product."),
    quantity: z.number().describe("The quantity of the product ordered."),
    price: z.number().describe("The price of a single unit of the product."),
  })).describe("An array of items included in the order."),
  total: z.number().describe("The total cost of the order."),
});
export type ConfirmationEmailInput = z.infer<typeof ConfirmationEmailInputSchema>;

const ConfirmationEmailOutputSchema = z.object({
  subject: z.string().describe("The subject line for the confirmation email."),
  body: z.string().describe("The full HTML body of the confirmation email."),
});
export type ConfirmationEmailOutput = z.infer<typeof ConfirmationEmailOutputSchema>;


export async function generateConfirmationEmail(input: ConfirmationEmailInput): Promise<ConfirmationEmailOutput> {
  return emailConfirmationFlow(input);
}


const prompt = ai.definePrompt({
  name: 'emailConfirmationPrompt',
  input: { schema: ConfirmationEmailInputSchema },
  output: { schema: ConfirmationEmailOutputSchema },
  prompt: `You are an order management assistant for an e-commerce store called "Zephora Stores" that sells football jerseys.
Your task is to generate a friendly and professional order confirmation email.

The user has just placed an order. Generate an appropriate subject line and a visually appealing HTML email body.

Here is the order information:
Order ID: {{{orderId}}}
Customer Name: {{{customerName}}}
Total: \${{{total}}}

Items:
{{#each items}}
- {{name}} (Quantity: {{quantity}}, Unit Price: \${{price}})
{{/each}}

The email should thank the customer, summarize the order details clearly, and state that they will be notified when the order ships.
Use HTML for formatting. Include a header with the store name "Zephora Stores".
`,
});

const emailConfirmationFlow = ai.defineFlow(
  {
    name: 'emailConfirmationFlow',
    inputSchema: ConfirmationEmailInputSchema,
    outputSchema: ConfirmationEmailOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    // In a real application, you would add code here to send the email
    // using a service like SendGrid, Mailgun, or AWS SES.
    console.log("---- FAKE EMAIL SEND ----");
    console.log("To: customer");
    console.log("Subject:", output!.subject);
    console.log("Body:", output!.body);
    console.log("-----------------------");

    return output!;
  }
);
