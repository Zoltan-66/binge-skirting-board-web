import { handleRfqRequest, type ZohoRfqEnv } from "../../src/lib/zoho-rfq";

type PagesContext = {
  request: Request;
  env: ZohoRfqEnv;
};

const corsHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Origin": "*",
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(corsHeaders)) headers.set(key, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context: PagesContext) {
  return withCors(await handleRfqRequest(context.request, context.env));
}
