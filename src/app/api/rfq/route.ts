import { handleRfqRequest, type ZohoRfqEnv } from "@/lib/zoho-rfq";

export async function POST(request: Request) {
  return handleRfqRequest(request, process.env as ZohoRfqEnv);
}
