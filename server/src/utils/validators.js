const { z } = require("zod");

const donationSchema = z.object({
  amount: z.coerce.number().positive("Amount must be positive"),
  frequency: z.enum(["one-time", "monthly"]).default("one-time"),
  ngoId: z.string().min(1),
  ngoName: z.string().min(1),
  causeId: z.string().min(1),
  causeTitle: z.string().min(1),
  donor: z.object({
    name: z.string().min(2, "Donor name is required"),
    email: z.string().email("Valid donor email is required"),
    phone: z.string().optional().default("")
  })
});

const ngoRegistrationSchema = z.object({
  organizationName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  city: z.string().min(2),
  category: z.string().min(2),
  registrationNumber: z.string().min(2),
  programTitle: z.string().min(2),
  programDescription: z.string().min(10),
  fundingGoal: z.coerce.number().positive(),
  beneficiariesTarget: z.coerce.number().positive(),
  website: z.string().optional().default(""),
  bankAccountName: z.string().min(2),
  documentLink: z.string().optional().default("")
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  type: z.string().optional().default("general")
});

function validate(schema, body) {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
    const error = new Error(message || "Validation failed");
    error.status = 400;
    throw error;
  }
  return parsed.data;
}

module.exports = { donationSchema, ngoRegistrationSchema, contactSchema, validate };
