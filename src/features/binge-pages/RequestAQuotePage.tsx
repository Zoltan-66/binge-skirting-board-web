"use client";

import { useEffect, useState, useRef } from 'react';
import { Link } from '@/lib/router-compat';
import { useForm, useWatch } from 'react-hook-form';
import { ChevronRight, ChevronDown, Upload, X, CheckCircle, ArrowRight } from 'lucide-react';
import { PRODUCT_CATALOGUE, type Product } from '@/data/product-catalogue';
import { parseRfqDraft, RFQ_DRAFT_STORAGE_KEY, sanitizeRfqDraft } from '@/lib/rfq-draft';

// ─── Form data type ───────────────────────────────────────────────────────────

type QuoteFormData = {
  name: string;
  company: string;
  country: string;
  businessType: string;
  email: string;
  phone: string;
  productCategory: string;
  productCode: string;
  quantity: string;
  finish: string;
  deliveryDate: string;
  destinationPort: string;
  message: string;
  privacy: boolean;
};

// ─── Select options ───────────────────────────────────────────────────────────

const COUNTRIES = [
  'Australia', 'Austria', 'Belgium', 'Canada', 'China', 'Czech Republic',
  'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland',
  'Italy', 'Japan', 'Netherlands', 'New Zealand', 'Norway', 'Poland',
  'Portugal', 'Romania', 'Singapore', 'South Africa', 'Spain', 'Sweden',
  'Switzerland', 'Turkey', 'UAE', 'United Kingdom', 'United States', 'Other',
];

const BUSINESS_TYPES = [
  'Building Material Importer',
  'Flooring Distributor',
  'Architect or Interior Designer',
  'Interior Fit-Out Contractor',
  'Wholesaler or Stockist',
  'Property Developer',
  'Procurement Manager',
  'End User / Other',
];

const PRODUCT_CATEGORIES = [
  'Aluminium Skirting',
  'Recessed & Shadow Gap Systems',
  'LED Skirting Systems',
  'Solid Wood Skirting',
  'Stainless Steel Skirting',
  'WPC Skirting',
  'Trims & Finishing Profiles',
  'Accessories',
  'Multiple / Not yet decided',
];

const CATEGORY_LABELS: Record<Product['category'], string> = {
  Aluminium: 'Aluminium Skirting',
  Recessed: 'Recessed & Shadow Gap Systems',
  LED: 'LED Skirting Systems',
  'Solid Wood': 'Solid Wood Skirting',
  'Stainless Steel': 'Stainless Steel Skirting',
  WPC: 'WPC Skirting',
  Trims: 'Trims & Finishing Profiles',
};

const FINISHES = [
  'Brushed Anodised',
  'Mill Finish Anodised',
  'Custom Anodised Colour',
  'Powder Coat (RAL)',
  'Custom Powder Coat Colour',
  'Mirror Polish',
  'Not yet decided',
];

// ─── Shared field styles ──────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)',
  fontWeight: 700, color: 'var(--binge-text-primary)',
  letterSpacing: '0.02em', display: 'block', marginBottom: '8px',
};

const baseInput: React.CSSProperties = {
  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)',
  fontWeight: 400, color: 'var(--binge-text-primary)',
  backgroundColor: 'var(--binge-white)', border: '1px solid var(--binge-border)',
  borderRadius: 0, padding: '0 14px', height: '48px',
  width: '100%', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const errorInput: React.CSSProperties = { ...baseInput, border: '1px solid var(--destructive, #d4183d)' };

const baseSelect: React.CSSProperties = {
  ...baseInput, appearance: 'none', WebkitAppearance: 'none',
  paddingRight: '36px', cursor: 'pointer',
} as React.CSSProperties;

const errorSelect: React.CSSProperties = { ...baseSelect, border: '1px solid var(--destructive, #d4183d)' };

const errorMsg: React.CSSProperties = {
  fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)',
  fontWeight: 400, color: 'var(--destructive, #d4183d)', marginTop: '6px', display: 'block',
};

const reqStar = <span style={{ color: 'var(--binge-orange)', marginLeft: '2px' }}>*</span>;

// ─── Reusable sub-components ──────────────────────────────────────────────────

function SelectWrapper({ error, children }: { error?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }} data-invalid={error || undefined}>
      {children}
      <ChevronDown size={13} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--binge-text-muted)', pointerEvents: 'none' }} />
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <section style={{ backgroundColor: 'var(--binge-white)', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--binge-section-v) var(--binge-pad-h)', textAlign: 'center' }}>
        {/* Icon */}
        <div style={{ width: '72px', height: '72px', border: '2px solid var(--binge-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', borderRadius: 0 }}>
          <CheckCircle size={32} style={{ color: 'var(--binge-orange)' }} />
        </div>

        <span style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
          color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase',
          display: 'block', marginBottom: '16px',
        }}>Pre-launch Form Preview</span>

        <h1 style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-sm)', fontWeight: 700,
          color: 'var(--binge-text-primary)', lineHeight: 'var(--binge-lh-heading)',
          margin: '0 0 20px', letterSpacing: '-0.02em',
        }}>
          Validation complete. Nothing was sent.
        </h1>

        <p style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
          color: 'var(--binge-text-body)', lineHeight: 'var(--binge-lh-body)', margin: '0 0 12px',
        }}>
          This website is still in test mode. Your entries were checked in this browser, but no enquiry,
          contact details or attachment was transmitted to BINGE.
        </p>

        <p style={{
          fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
          color: 'var(--binge-text-muted)', lineHeight: 'var(--binge-lh-body)', margin: '0 0 40px',
        }}>
          Real submission will be enabled after the company domain and receiving channel are configured.
        </p>

        {/* Next steps */}
        <div style={{ borderTop: '1px solid var(--binge-border)', borderBottom: '1px solid var(--binge-border)', padding: '28px 0', marginBottom: '32px', textAlign: 'left' }}>
          <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', margin: '0 0 16px' }}>
            What this preview checked
          </p>
          {[
            'Required contact and project fields passed validation.',
            'The selected catalogue product was carried into the RFQ.',
            'Sensitive fields and attachments were not saved or transmitted.',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 2 ? '12px' : 0 }}>
              <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 700, color: 'var(--binge-orange)', flexShrink: 0, marginTop: '2px' }}>0{i + 1}</span>
              <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 1.5, margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <Link to="/products" style={{
            backgroundColor: 'var(--binge-orange)', color: '#fff',
            fontFamily: 'var(--binge-font)', fontWeight: 700,
            fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
            textTransform: 'uppercase', textDecoration: 'none',
            height: '48px', display: 'inline-flex', alignItems: 'center',
            padding: '0 28px', borderRadius: 0,
          }}>
            Browse Products <ArrowRight size={14} style={{ marginLeft: '8px' }} />
          </Link>
          <button onClick={onReset} style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
            color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)',
            textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer',
          }}>
            Submit Another Request
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function RequestAQuotePage() {
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError]   = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const draftReadyRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<QuoteFormData>({ mode: 'onBlur' });
  const draftValues = useWatch({ control });

  useEffect(() => {
    const draft = parseRfqDraft(window.localStorage.getItem(RFQ_DRAFT_STORAGE_KEY));
    reset(draft);

    const requestedCode = new URLSearchParams(window.location.search).get('product')?.trim().toUpperCase();
    const product = PRODUCT_CATALOGUE.find(item => item.code.toUpperCase() === requestedCode);
    if (product) {
      setValue('productCode', product.code);
      setValue('productCategory', CATEGORY_LABELS[product.category]);
    }
    draftReadyRef.current = true;
  }, [reset, setValue]);

  useEffect(() => {
    if (!draftReadyRef.current) return;
    const safeDraft = sanitizeRfqDraft(draftValues);
    if (Object.keys(safeDraft).length) {
      window.localStorage.setItem(RFQ_DRAFT_STORAGE_KEY, JSON.stringify(safeDraft));
    } else {
      window.localStorage.removeItem(RFQ_DRAFT_STORAGE_KEY);
    }
  }, [draftValues]);

  const handleFile = (file: File) => {
    setUploadError('');
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File exceeds 10 MB. Please reduce the file size and try again.');
      return;
    }
    const allowed = ['.pdf', '.dxf', '.dwg', '.step', '.stp', '.jpg', '.jpeg', '.png'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowed.includes(ext)) {
      setUploadError('File type not accepted. Please upload PDF, DXF, DWG, STEP or image files.');
      return;
    }
    setUploadedFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 450));
    window.localStorage.removeItem(RFQ_DRAFT_STORAGE_KEY);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessState onReset={() => { setSubmitted(false); setUploadedFile(null); reset(); }} />;
  }

  return (
    <>
      {/* ── Page header ── */}
      <div style={{ backgroundColor: 'var(--binge-dark)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: '40px var(--binge-pad-h) 48px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 400, color: 'rgba(255,255,255,0.7)' }}>Request a Quote</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16" style={{ alignItems: 'end' }}>
            <div>
              <span style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700,
                color: 'var(--binge-orange)', letterSpacing: 'var(--binge-tracking-label)',
                textTransform: 'uppercase', display: 'block', marginBottom: '14px',
              }}>RFQ</span>
              <h1 style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-display-md)', fontWeight: 700,
                color: '#fff', lineHeight: 'var(--binge-lh-heading)', margin: 0, letterSpacing: '-0.02em',
              }}>
                Tell us what your<br />project needs.
              </h1>
            </div>
            <div>
              <p style={{
                fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body-lg)', fontWeight: 300,
                color: 'rgba(255,255,255,0.6)', lineHeight: 'var(--binge-lh-body)', margin: 0,
              }}>
                Preview the information buyers will provide for a quotation. Submission is currently disabled
                while the company domain and receiving channel are being prepared.
              </p>
            </div>
          </div>
        </div>
        <div style={{ height: '3px', backgroundColor: 'var(--binge-orange)' }} />
      </div>

      {/* ── Form ── */}
      <section style={{ backgroundColor: 'var(--binge-white)' }}>
        <div style={{ maxWidth: 'var(--binge-content-max)', margin: '0 auto', padding: 'var(--binge-section-v) var(--binge-pad-h)' }}>
          {/* Required field note */}
          <p style={{
            fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300,
            color: 'var(--binge-text-muted)', margin: '0 0 40px',
          }}>
            Fields marked <span style={{ color: 'var(--binge-orange)', fontWeight: 700 }}>*</span> are required.
          </p>

          <div role="status" style={{ border: '1px solid var(--binge-orange)', background: 'var(--binge-warm-bg)', padding: '16px 18px', margin: '-20px 0 40px', color: 'var(--binge-text-body)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--binge-text-primary)' }}>Pre-launch test mode:</strong>{' '}
            this form validates locally but does not send data. Only non-sensitive project selections are saved as a browser draft; contact details, messages, consent and files are never persisted.
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* ── Two-column grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">

              {/* ── LEFT COLUMN — Contact & requester ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '24px' }}>

                <div style={{ borderBottom: '1px solid var(--binge-border)', paddingBottom: '24px', marginBottom: '4px' }}>
                  <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', margin: '0 0 20px' }}>Contact Information</p>

                  {/* Name */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-name" style={labelStyle}>Full Name {reqStar}</label>
                    <input
                      id="quote-name"
                      type="text" placeholder="Your full name"
                      {...register('name', { required: 'Please enter your full name.', minLength: { value: 2, message: 'Name must be at least 2 characters.' } })}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'quote-name-error' : undefined}
                      style={errors.name ? errorInput : baseInput}
                    />
                    {errors.name && <span id="quote-name-error" role="alert" style={errorMsg}>{errors.name.message}</span>}
                  </div>

                  {/* Company */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-company" style={labelStyle}>Company Name {reqStar}</label>
                    <input
                      id="quote-company"
                      type="text" placeholder="Your company or trading name"
                      {...register('company', { required: 'Please enter your company name.' })}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'quote-company-error' : undefined}
                      style={errors.company ? errorInput : baseInput}
                    />
                    {errors.company && <span id="quote-company-error" role="alert" style={errorMsg}>{errors.company.message}</span>}
                  </div>

                  {/* Country */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-country" style={labelStyle}>Country {reqStar}</label>
                    <SelectWrapper error={!!errors.country}>
                      <select
                        id="quote-country"
                        {...register('country', { validate: v => v !== '' || 'Please select your country.' })}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? 'quote-country-error' : undefined}
                        style={errors.country ? errorSelect : baseSelect}
                        defaultValue=""
                      >
                        <option value="" disabled>Select country…</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </SelectWrapper>
                    {errors.country && <span id="quote-country-error" role="alert" style={errorMsg}>{errors.country.message}</span>}
                  </div>

                  {/* Business type */}
                  <div>
                    <label htmlFor="quote-business-type" style={labelStyle}>Business Type {reqStar}</label>
                    <SelectWrapper error={!!errors.businessType}>
                      <select
                        id="quote-business-type"
                        {...register('businessType', { validate: v => v !== '' || 'Please select your business type.' })}
                        aria-invalid={!!errors.businessType}
                        aria-describedby={errors.businessType ? 'quote-business-type-error' : undefined}
                        style={errors.businessType ? errorSelect : baseSelect}
                        defaultValue=""
                      >
                        <option value="" disabled>Select business type…</option>
                        {BUSINESS_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </SelectWrapper>
                    {errors.businessType && <span id="quote-business-type-error" role="alert" style={errorMsg}>{errors.businessType.message}</span>}
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', margin: '0 0 20px' }}>Contact Details</p>

                  {/* Email */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-email" style={labelStyle}>Email Address {reqStar}</label>
                    <input
                      id="quote-email"
                      type="email" placeholder="you@company.com"
                      {...register('email', {
                        required: 'Please enter your email address.',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address.' },
                      })}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'quote-email-error' : undefined}
                      style={errors.email ? errorInput : baseInput}
                    />
                    {errors.email && <span id="quote-email-error" role="alert" style={errorMsg}>{errors.email.message}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="quote-phone" style={labelStyle}>WhatsApp or Phone {reqStar}</label>
                    <input
                      id="quote-phone"
                      type="tel" placeholder="+44 7XXX XXXXXX"
                      {...register('phone', { required: 'Please enter a contact number.', minLength: { value: 6, message: 'Please enter a valid phone number.' } })}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'quote-phone-error' : 'quote-phone-help'}
                      style={errors.phone ? errorInput : baseInput}
                    />
                    <span id="quote-phone-help" style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 300, color: 'var(--binge-text-muted)', marginTop: '6px', display: 'block' }}>
                      Include country code. We may use WhatsApp for quick clarifications.
                    </span>
                    {errors.phone && <span id="quote-phone-error" role="alert" style={errorMsg}>{errors.phone.message}</span>}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN — Product & project ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', borderTop: '1px solid var(--binge-border)', paddingTop: '24px' }} className="lg:border-t-0 lg:pt-0 lg:border-l lg:pl-12" >

                <div style={{ borderBottom: '1px solid var(--binge-border)', paddingBottom: '24px' }}>
                  <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', margin: '0 0 20px' }}>Product Requirements</p>

                  {/* Product category */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-product-category" style={labelStyle}>Product Category {reqStar}</label>
                    <SelectWrapper error={!!errors.productCategory}>
                      <select
                        id="quote-product-category"
                        {...register('productCategory', { validate: v => v !== '' || 'Please select a product category.' })}
                        aria-invalid={!!errors.productCategory}
                        aria-describedby={errors.productCategory ? 'quote-product-category-error' : undefined}
                        style={errors.productCategory ? errorSelect : baseSelect}
                        defaultValue=""
                      >
                        <option value="" disabled>Select category…</option>
                        {PRODUCT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </SelectWrapper>
                    {errors.productCategory && <span id="quote-product-category-error" role="alert" style={errorMsg}>{errors.productCategory.message}</span>}
                  </div>

                  {/* Product code */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-product-code" style={labelStyle}>Product Code <span style={{ fontFamily: 'var(--binge-font)', fontWeight: 300, color: 'var(--binge-text-muted)', fontSize: 'var(--binge-size-caption)' }}>(if known)</span></label>
                    <input
                      id="quote-product-code"
                      type="text" placeholder="e.g. AS-FF, WS-TG"
                      {...register('productCode')}
                      style={baseInput}
                    />
                  </div>

                  {/* Quantity */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-quantity" style={labelStyle}>Estimated Quantity {reqStar}</label>
                    <input
                      id="quote-quantity"
                      type="text" placeholder="e.g. 500 linear metres"
                      {...register('quantity', { required: 'Please provide an estimated quantity.' })}
                      aria-invalid={!!errors.quantity}
                      aria-describedby={errors.quantity ? 'quote-quantity-error' : undefined}
                      style={errors.quantity ? errorInput : baseInput}
                    />
                    {errors.quantity && <span id="quote-quantity-error" role="alert" style={errorMsg}>{errors.quantity.message}</span>}
                  </div>

                  {/* Finish */}
                  <div>
                    <label htmlFor="quote-finish" style={labelStyle}>Required Finish <span style={{ fontFamily: 'var(--binge-font)', fontWeight: 300, color: 'var(--binge-text-muted)', fontSize: 'var(--binge-size-caption)' }}>(if known)</span></label>
                    <SelectWrapper>
                      <select id="quote-finish" {...register('finish')} style={baseSelect} defaultValue="">
                        <option value="">Not yet decided</option>
                        {FINISHES.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </SelectWrapper>
                  </div>
                </div>

                <div>
                  <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-label)', fontWeight: 700, color: 'var(--binge-text-muted)', letterSpacing: 'var(--binge-tracking-label)', textTransform: 'uppercase', margin: '0 0 20px' }}>Logistics</p>

                  {/* Delivery date */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-delivery-date" style={labelStyle}>Target Delivery Date <span style={{ fontFamily: 'var(--binge-font)', fontWeight: 300, color: 'var(--binge-text-muted)', fontSize: 'var(--binge-size-caption)' }}>(optional)</span></label>
                    <input
                      id="quote-delivery-date"
                      type="text" placeholder="e.g. Q3 2025 or August 2025"
                      {...register('deliveryDate')}
                      style={baseInput}
                    />
                  </div>

                  {/* Destination port */}
                  <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quote-destination" style={labelStyle}>Destination Port {reqStar}</label>
                    <input
                      id="quote-destination"
                      type="text" placeholder="e.g. Felixstowe, UK or Melbourne, AUS"
                      {...register('destinationPort', { required: 'Please enter a destination port or city.' })}
                      aria-invalid={!!errors.destinationPort}
                      aria-describedby={errors.destinationPort ? 'quote-destination-error' : undefined}
                      style={errors.destinationPort ? errorInput : baseInput}
                    />
                    {errors.destinationPort && <span id="quote-destination-error" role="alert" style={errorMsg}>{errors.destinationPort.message}</span>}
                  </div>

                  {/* Drawing upload */}
                  <div>
                    <label htmlFor="quote-file" style={labelStyle}>Technical Drawing or Reference File <span style={{ fontFamily: 'var(--binge-font)', fontWeight: 300, color: 'var(--binge-text-muted)', fontSize: 'var(--binge-size-caption)' }}>(optional)</span></label>
                    <div
                      style={{
                        border: `1px dashed ${uploadError ? 'var(--destructive, #d4183d)' : 'var(--binge-border)'}`,
                        backgroundColor: 'var(--binge-card-bg)', padding: '24px',
                        cursor: 'pointer', textAlign: 'center', borderRadius: 0,
                        transition: 'border-color 0.15s',
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={onDrop}
                    >
                      {uploadedFile ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                          <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 400, color: 'var(--binge-text-primary)' }}>{uploadedFile.name}</span>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setUploadedFile(null); setUploadError(''); }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--binge-text-muted)', display: 'flex', alignItems: 'center', padding: '4px' }}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={22} style={{ color: 'var(--binge-text-muted)', marginBottom: '10px' }} />
                          <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 400, color: 'var(--binge-text-primary)', margin: '0 0 4px' }}>
                            Click to upload or drag and drop
                          </p>
                          <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 300, color: 'var(--binge-text-muted)', margin: 0 }}>
                            PDF, DXF, DWG, STEP, JPG or PNG — max 10 MB
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="quote-file"
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      accept=".pdf,.dxf,.dwg,.step,.stp,.jpg,.jpeg,.png"
                      onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
                    />
                    {uploadError && <span style={errorMsg}>{uploadError}</span>}
                    <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 300, color: 'var(--binge-text-muted)', marginTop: '6px', display: 'block' }}>
                      A profile drawing or site reference helps us prepare a more accurate quotation.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Full-width fields ── */}
            <div style={{ borderTop: '1px solid var(--binge-border)', marginTop: '40px', paddingTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Message */}
              <div>
                <label htmlFor="quote-message" style={labelStyle}>Project Details {reqStar}</label>
                <textarea
                  id="quote-message"
                  rows={6}
                  placeholder="Describe your project: application, specification requirements, any non-standard dimensions and anything else that would help our team prepare an accurate quotation."
                  {...register('message', {
                    required: 'Please add project details to help us prepare your quotation.',
                    minLength: { value: 20, message: 'Please provide at least 20 characters of project detail.' },
                  })}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'quote-message-error' : undefined}
                  style={{
                    ...baseInput,
                    height: 'auto', padding: '14px', resize: 'vertical',
                    lineHeight: 'var(--binge-lh-body)',
                    border: errors.message ? '1px solid var(--destructive, #d4183d)' : '1px solid var(--binge-border)',
                  } as React.CSSProperties}
                />
                {errors.message && <span id="quote-message-error" role="alert" style={errorMsg}>{errors.message.message}</span>}
              </div>

              {/* Privacy consent */}
              <div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                  <input
                    id="quote-privacy"
                    type="checkbox"
                    {...register('privacy', { required: 'You must accept the privacy policy to submit this form.' })}
                    aria-invalid={!!errors.privacy}
                    aria-describedby={errors.privacy ? 'quote-privacy-error' : undefined}
                    style={{
                      width: '20px', height: '20px', flexShrink: 0, marginTop: '1px',
                      accentColor: 'var(--binge-orange)', cursor: 'pointer',
                      borderRadius: 0,
                    }}
                  />
                  <span style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-body)', fontWeight: 300, color: 'var(--binge-text-body)', lineHeight: 1.6 }}>
                    I agree to BINGE&apos;s{' '}
                    pre-launch privacy notice and understand that this test form does not transmit my contact details.{' '}
                    {reqStar}
                  </span>
                </label>
                {errors.privacy && <span id="quote-privacy-error" role="alert" style={{ ...errorMsg, marginTop: '8px' }}>{errors.privacy.message}</span>}
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', paddingTop: '8px' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: submitting ? 'var(--binge-text-muted)' : 'var(--binge-orange)',
                    color: '#fff', fontFamily: 'var(--binge-font)', fontWeight: 700,
                    fontSize: 'var(--binge-size-button)', letterSpacing: 'var(--binge-tracking-button)',
                    textTransform: 'uppercase', height: '48px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0 36px', borderRadius: 0, border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer', minWidth: '200px',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {submitting ? 'Checking…' : 'Preview Submission'}
                </button>
                <p style={{ fontFamily: 'var(--binge-font)', fontSize: 'var(--binge-size-caption)', fontWeight: 300, color: 'var(--binge-text-muted)', lineHeight: 1.5, margin: 0, maxWidth: '320px' }}>
                  Test mode only: no enquiry is sent and no contact details are stored.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
