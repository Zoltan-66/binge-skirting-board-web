import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildZohoLeadPayload,
  handleRfqRequest,
  validateRfqSubmission,
} from '../src/lib/zoho-rfq.ts';

const VALID_RFQ = {
  name: 'Ada Buyer',
  company: 'Modern Floors Ltd',
  country: 'United Kingdom',
  businessType: 'Flooring Distributor',
  email: 'Ada@Example.com',
  phone: '+44 7000 000000',
  productCategory: 'Aluminium Skirting',
  productCode: 'AS-FF',
  quantity: '500 linear metres',
  finish: 'Powder Coat (RAL)',
  deliveryDate: 'Q3 2026',
  destinationPort: 'Felixstowe',
  message: 'Please quote for a distributor order with samples before production.',
  privacy: true,
  source: 'downloads',
  attachment: { name: 'profile.pdf', size: 2048, type: 'application/pdf' },
};

test('RFQ server validation normalizes fields and rejects invalid submissions', () => {
  const rfq = validateRfqSubmission(VALID_RFQ);

  assert.equal(rfq.email, 'ada@example.com');
  assert.equal(rfq.attachment.name, 'profile.pdf');
  assert.throws(() => validateRfqSubmission({ ...VALID_RFQ, email: 'bad', privacy: false }), /RFQ validation failed/);
});

test('Zoho lead payload uses standard Lead fields and keeps RFQ details in the description', () => {
  const payload = buildZohoLeadPayload(validateRfqSubmission(VALID_RFQ));
  const lead = payload.data[0];

  assert.equal(lead.First_Name, 'Ada');
  assert.equal(lead.Last_Name, 'Buyer');
  assert.equal(lead.Company, 'Modern Floors Ltd');
  assert.equal(lead.Email, 'ada@example.com');
  assert.equal(lead.Lead_Source, 'Website RFQ');
  assert.match(lead.Description, /Product code: AS-FF/);
  assert.match(lead.Description, /Reference file: profile\.pdf/);
});

test('RFQ API handler refreshes a Zoho token and inserts a Lead', async () => {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url).includes('/oauth/v2/token')) {
      return Response.json({ access_token: 'access-token' });
    }
    return Response.json({ data: [{ status: 'success', details: { id: '12345' } }] });
  };
  const request = new Request('https://example.com/api/rfq', {
    method: 'POST',
    body: JSON.stringify(VALID_RFQ),
  });

  const response = await handleRfqRequest(request, {
    ZOHO_CLIENT_ID: 'client-id',
    ZOHO_CLIENT_SECRET: 'client-secret',
    ZOHO_REFRESH_TOKEN: 'refresh-token',
    ZOHO_ACCOUNTS_URL: 'https://accounts.zoho.eu',
    ZOHO_API_DOMAIN: 'https://www.zohoapis.eu',
  }, fetcher);

  assert.equal(response.status, 201);
  assert.equal(calls[0].url, 'https://accounts.zoho.eu/oauth/v2/token');
  assert.equal(calls[1].url, 'https://www.zohoapis.eu/crm/v8/Leads');
  assert.equal(calls[1].init.headers.Authorization, 'Zoho-oauthtoken access-token');
});
