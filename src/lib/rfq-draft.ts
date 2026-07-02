export const RFQ_DRAFT_STORAGE_KEY = 'binge-rfq-draft-v1';

export const RFQ_DRAFT_FIELDS = [
  'company',
  'country',
  'businessType',
  'productCategory',
  'productCode',
  'quantity',
  'finish',
  'deliveryDate',
  'destinationPort',
] as const;

export type RfqDraft = Partial<Record<(typeof RFQ_DRAFT_FIELDS)[number], string>>;

export function sanitizeRfqDraft(value: unknown): RfqDraft {
  if (!value || typeof value !== 'object') return {};
  const source = value as Record<string, unknown>;
  return Object.fromEntries(
    RFQ_DRAFT_FIELDS.flatMap(field => {
      const fieldValue = source[field];
      return typeof fieldValue === 'string' && fieldValue.trim() ? [[field, fieldValue.slice(0, 240)]] : [];
    }),
  ) as RfqDraft;
}

export function parseRfqDraft(serialized: string | null): RfqDraft {
  if (!serialized) return {};
  try {
    return sanitizeRfqDraft(JSON.parse(serialized));
  } catch {
    return {};
  }
}
