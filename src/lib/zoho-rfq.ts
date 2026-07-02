export type RfqAttachmentMeta = {
  name: string;
  size: number;
  type?: string;
};

export type RfqSubmission = {
  name: string;
  company: string;
  country: string;
  businessType: string;
  email: string;
  phone: string;
  productCategory: string;
  productCode?: string;
  quantity: string;
  finish?: string;
  deliveryDate?: string;
  destinationPort: string;
  message: string;
  privacy: boolean;
  source?: string;
  attachment?: RfqAttachmentMeta;
};

export type ZohoRfqEnv = Record<string, string | undefined>;

type ZohoConfig = {
  accountsUrl: string;
  apiDomain: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  leadsModule: string;
};

type Fetcher = typeof fetch;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS: Partial<Record<keyof RfqSubmission, number>> = {
  name: 120,
  company: 180,
  country: 80,
  businessType: 120,
  email: 180,
  phone: 80,
  productCategory: 140,
  productCode: 80,
  quantity: 120,
  finish: 120,
  deliveryDate: 80,
  destinationPort: 140,
  message: 4000,
  source: 120,
};

export class RfqValidationError extends Error {
  readonly fields: Record<string, string>;

  constructor(fields: Record<string, string>) {
    super("RFQ validation failed");
    this.fields = fields;
  }
}

export class ZohoConfigurationError extends Error {
  constructor() {
    super("Zoho CRM is not configured");
  }
}

export class ZohoSubmissionError extends Error {
  constructor(message = "Zoho CRM rejected the RFQ submission") {
    super(message);
  }
}

function normalizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeMultiline(value: unknown, maxLength = 4000): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\r\n/g, "\n").slice(0, maxLength);
}

export function validateRfqSubmission(value: unknown): RfqSubmission {
  const input = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const submission: RfqSubmission = {
    name: normalizeText(input.name, MAX_LENGTHS.name),
    company: normalizeText(input.company, MAX_LENGTHS.company),
    country: normalizeText(input.country, MAX_LENGTHS.country),
    businessType: normalizeText(input.businessType, MAX_LENGTHS.businessType),
    email: normalizeText(input.email, MAX_LENGTHS.email).toLowerCase(),
    phone: normalizeText(input.phone, MAX_LENGTHS.phone),
    productCategory: normalizeText(input.productCategory, MAX_LENGTHS.productCategory),
    productCode: normalizeText(input.productCode, MAX_LENGTHS.productCode),
    quantity: normalizeText(input.quantity, MAX_LENGTHS.quantity),
    finish: normalizeText(input.finish, MAX_LENGTHS.finish),
    deliveryDate: normalizeText(input.deliveryDate, MAX_LENGTHS.deliveryDate),
    destinationPort: normalizeText(input.destinationPort, MAX_LENGTHS.destinationPort),
    message: normalizeMultiline(input.message, MAX_LENGTHS.message),
    privacy: input.privacy === true,
    source: normalizeText(input.source, MAX_LENGTHS.source),
  };

  const attachment = input.attachment as Partial<RfqAttachmentMeta> | undefined;
  if (attachment && typeof attachment === "object" && typeof attachment.name === "string") {
    submission.attachment = {
      name: normalizeText(attachment.name, 180),
      size: typeof attachment.size === "number" && Number.isFinite(attachment.size) ? attachment.size : 0,
      type: normalizeText(attachment.type, 120),
    };
  }

  const fields: Record<string, string> = {};
  if (submission.name.length < 2) fields.name = "Please enter your full name.";
  if (!submission.company) fields.company = "Please enter your company name.";
  if (!submission.country) fields.country = "Please select your country.";
  if (!submission.businessType) fields.businessType = "Please select your business type.";
  if (!EMAIL_PATTERN.test(submission.email)) fields.email = "Please enter a valid email address.";
  if (submission.phone.length < 6) fields.phone = "Please enter a valid phone number.";
  if (!submission.productCategory) fields.productCategory = "Please select a product category.";
  if (!submission.quantity) fields.quantity = "Please provide an estimated quantity.";
  if (!submission.destinationPort) fields.destinationPort = "Please enter a destination port or city.";
  if (submission.message.length < 20) fields.message = "Please provide at least 20 characters of project detail.";
  if (!submission.privacy) fields.privacy = "You must accept the privacy policy to submit this form.";

  if (Object.keys(fields).length) throw new RfqValidationError(fields);
  return submission;
}

function readZohoConfig(env: ZohoRfqEnv): ZohoConfig {
  const clientId = env.ZOHO_CLIENT_ID?.trim();
  const clientSecret = env.ZOHO_CLIENT_SECRET?.trim();
  const refreshToken = env.ZOHO_REFRESH_TOKEN?.trim();
  if (!clientId || !clientSecret || !refreshToken) throw new ZohoConfigurationError();

  return {
    accountsUrl: (env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com").replace(/\/+$/, ""),
    apiDomain: (env.ZOHO_API_DOMAIN || "https://www.zohoapis.com").replace(/\/+$/, ""),
    clientId,
    clientSecret,
    refreshToken,
    leadsModule: env.ZOHO_LEADS_MODULE?.trim() || "Leads",
  };
}

function splitName(fullName: string): { First_Name?: string; Last_Name: string } {
  const parts = fullName.split(" ").filter(Boolean);
  if (parts.length === 1) return { Last_Name: parts[0] };
  return {
    First_Name: parts.slice(0, -1).join(" "),
    Last_Name: parts[parts.length - 1],
  };
}

function buildDescription(submission: RfqSubmission): string {
  const rows = [
    ["Business type", submission.businessType],
    ["Product category", submission.productCategory],
    ["Product code", submission.productCode],
    ["Estimated quantity", submission.quantity],
    ["Required finish", submission.finish],
    ["Target delivery date", submission.deliveryDate],
    ["Destination port/city", submission.destinationPort],
    ["Source", submission.source || "Website RFQ"],
    submission.attachment
      ? ["Reference file", `${submission.attachment.name} (${Math.round(submission.attachment.size / 1024)} KB)`]
      : undefined,
    ["Project details", submission.message],
  ].filter(Boolean) as Array<[string, string | undefined]>;

  return rows
    .filter(([, detail]) => detail)
    .map(([label, detail]) => `${label}: ${detail}`)
    .join("\n");
}

export function buildZohoLeadPayload(submission: RfqSubmission) {
  const name = splitName(submission.name);

  return {
    data: [
      {
        ...name,
        Company: submission.company,
        Email: submission.email,
        Phone: submission.phone,
        Country: submission.country,
        Lead_Source: "Website RFQ",
        Description: buildDescription(submission),
      },
    ],
    trigger: ["workflow"],
  };
}

async function getZohoAccessToken(config: ZohoConfig, fetcher: Fetcher): Promise<string> {
  const body = new URLSearchParams({
    refresh_token: config.refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
  });

  const response = await fetcher(`${config.accountsUrl}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const json = await response.json().catch(() => ({})) as { access_token?: string; error?: string };

  if (!response.ok || !json.access_token) {
    throw new ZohoSubmissionError(json.error ? `Zoho token refresh failed: ${json.error}` : "Zoho token refresh failed");
  }

  return json.access_token;
}

export async function submitRfqToZoho(submission: RfqSubmission, env: ZohoRfqEnv, fetcher: Fetcher = fetch) {
  const config = readZohoConfig(env);
  const accessToken = await getZohoAccessToken(config, fetcher);
  const response = await fetcher(`${config.apiDomain}/crm/v8/${encodeURIComponent(config.leadsModule)}`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildZohoLeadPayload(submission)),
  });
  const json = await response.json().catch(() => ({})) as {
    data?: Array<{ status?: string; code?: string; message?: string; details?: { id?: string } }>;
  };
  const result = json.data?.[0];

  if (!response.ok || result?.status === "error") {
    throw new ZohoSubmissionError(result?.message || result?.code || "Zoho CRM rejected the RFQ submission");
  }

  return { id: result?.details?.id };
}

export async function handleRfqRequest(request: Request, env: ZohoRfqEnv, fetcher: Fetcher = fetch): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  try {
    const payload = await request.json();
    const submission = validateRfqSubmission(payload);
    const result = await submitRfqToZoho(submission, env, fetcher);
    return Response.json({ ok: true, id: result.id }, { status: 201 });
  } catch (error) {
    if (error instanceof RfqValidationError) {
      return Response.json({ ok: false, error: "Validation failed", fields: error.fields }, { status: 400 });
    }
    if (error instanceof ZohoConfigurationError) {
      return Response.json({ ok: false, error: "RFQ submission is not configured yet." }, { status: 503 });
    }
    if (error instanceof ZohoSubmissionError) {
      return Response.json({ ok: false, error: "Zoho CRM could not receive this RFQ. Please try again or contact sales directly." }, { status: 502 });
    }

    return Response.json({ ok: false, error: "Unexpected RFQ submission error." }, { status: 500 });
  }
}
