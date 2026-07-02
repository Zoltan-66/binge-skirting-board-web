import assert from 'node:assert/strict';
import test from 'node:test';
import { parseRfqDraft, sanitizeRfqDraft } from '../src/lib/rfq-draft.ts';

test('RFQ drafts retain only approved non-sensitive fields', () => {
  const draft = sanitizeRfqDraft({
    company: 'Example Distributor',
    country: 'Germany',
    productCode: 'AS-FF',
    quantity: '500 linear metres',
    email: 'buyer@example.com',
    phone: '+49 123',
    message: 'Sensitive project message',
    privacy: true,
  });

  assert.deepEqual(draft, {
    company: 'Example Distributor',
    country: 'Germany',
    productCode: 'AS-FF',
    quantity: '500 linear metres',
  });
});

test('RFQ draft parsing fails closed for malformed storage', () => {
  assert.deepEqual(parseRfqDraft('{not-json'), {});
});
