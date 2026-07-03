export type DownloadCategory =
  | 'Product Catalogues'
  | 'Technical Datasheets'
  | 'Installation Guides'
  | 'CAD & Section Drawings'
  | 'OEM / ODM Resources'
  | 'Packaging & Logistics'
  | 'Compliance Documents';

export type DocumentType =
  | 'Product catalogue'
  | 'Category brochure'
  | 'System brochure'
  | 'Capability guide'
  | 'Application guide'
  | 'Product datasheet'
  | 'Technical drawing'
  | 'Installation manual'
  | 'Packaging specification'
  | 'Project form'
  | 'Commercial terms'
  | 'Test report'
  | 'Compliance document'
  | 'Material evidence'
  | 'OEM drawing'
  | 'Internal commercial file';

export type FileFormat = 'PDF' | 'CAD / DWG' | 'XLSX' | 'PDF / CAD' | 'PDF / Video';

export type DownloadAvailability =
  | 'Public download'
  | 'Available after RFQ'
  | 'Internal / project only'
  | 'Needs factory confirmation';

export type DownloadItem = {
  id: number;
  title: string;
  productCodeOrRange: string;
  category: DownloadCategory;
  documentType: DocumentType;
  fileFormat: FileFormat;
  publicAvailability: DownloadAvailability;
  shortDescription: string;
  buyerFacingNote: string;
  ctaText: string;
};

export const DOWNLOAD_CATEGORIES: ('All Categories' | DownloadCategory)[] = [
  'All Categories',
  'Product Catalogues',
  'Technical Datasheets',
  'Installation Guides',
  'CAD & Section Drawings',
  'OEM / ODM Resources',
  'Packaging & Logistics',
  'Compliance Documents',
];

export const DOWNLOAD_DOCUMENT_TYPES: ('All Types' | DocumentType)[] = [
  'All Types',
  'Product catalogue',
  'Category brochure',
  'System brochure',
  'Capability guide',
  'Application guide',
  'Product datasheet',
  'Technical drawing',
  'Installation manual',
  'Packaging specification',
  'Project form',
  'Commercial terms',
  'Test report',
  'Compliance document',
  'Material evidence',
  'OEM drawing',
  'Internal commercial file',
];

export const DOWNLOAD_AVAILABILITY_GROUPS: DownloadAvailability[] = [
  'Public download',
  'Available after RFQ',
  'Internal / project only',
  'Needs factory confirmation',
];

export const DOWNLOAD_RESOURCES: DownloadItem[] = [
  {
    id: 1,
    title: 'BINGE Skirting & Architectural Profiles Catalogue',
    productCodeOrRange: 'All ranges',
    category: 'Product Catalogues',
    documentType: 'Product catalogue',
    fileFormat: 'PDF',
    publicAvailability: 'Public download',
    shortDescription: 'General catalogue structure for BINGE skirting boards and architectural profile systems.',
    buyerFacingNote: 'General product overview only. Detailed dimensions, material grades and compliance documents are available after project review.',
    ctaText: 'Download Catalogue',
  },
  {
    id: 2,
    title: 'Aluminum Skirting Range Overview',
    productCodeOrRange: 'AS-SC to AS-AB',
    category: 'Product Catalogues',
    documentType: 'Category brochure',
    fileFormat: 'PDF',
    publicAvailability: 'Public download',
    shortDescription: 'Surface-mounted aluminum skirting range names, applications and installation types.',
    buyerFacingNote: 'Public version shows range names and applications, not final technical dimensions unless confirmed.',
    ctaText: 'Download Aluminum Range',
  },
  {
    id: 3,
    title: 'Recessed & Shadow Gap Systems Overview',
    productCodeOrRange: 'RS-SG / RS-RC / RS-FL / RS-PI',
    category: 'Product Catalogues',
    documentType: 'System brochure',
    fileFormat: 'PDF',
    publicAvailability: 'Public download',
    shortDescription: 'Concept overview for recessed, shadow gap and plaster-in skirting systems.',
    buyerFacingNote: 'Public brochure can show system concept. Project drawings should be requested after RFQ.',
    ctaText: 'Download System Overview',
  },
  {
    id: 4,
    title: 'Trims & Profiles Overview',
    productCodeOrRange: 'AT-L / AT-FC / AT-TU / CT-IC / CT-EC',
    category: 'Product Catalogues',
    documentType: 'Category brochure',
    fileFormat: 'PDF',
    publicAvailability: 'Public download',
    shortDescription: 'Overview of aluminum edge trims, transitions and corner trim collections.',
    buyerFacingNote: 'Detailed size list and section drawings are available on request.',
    ctaText: 'Download Trims Overview',
  },
  {
    id: 5,
    title: 'OEM / ODM Custom Profile Guide',
    productCodeOrRange: 'All custom ranges',
    category: 'OEM / ODM Resources',
    documentType: 'Capability guide',
    fileFormat: 'PDF',
    publicAvailability: 'Public download',
    shortDescription: 'Custom profile, finish, colour, accessory and packaging capability overview.',
    buyerFacingNote: 'Custom options may include profile section, length, finish, colour, accessories and packaging.',
    ctaText: 'Start a Custom Project',
  },
  {
    id: 6,
    title: 'Applications Guide',
    productCodeOrRange: 'All ranges',
    category: 'Product Catalogues',
    documentType: 'Application guide',
    fileFormat: 'PDF',
    publicAvailability: 'Public download',
    shortDescription: 'Application references for residential, hotel, office, retail and commercial projects.',
    buyerFacingNote: 'Application examples are general references and should be matched to the project specification before use.',
    ctaText: 'View Applications',
  },
  {
    id: 7,
    title: 'Individual Product Datasheets',
    productCodeOrRange: 'Selected product code',
    category: 'Technical Datasheets',
    documentType: 'Product datasheet',
    fileFormat: 'PDF',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Product-specific datasheets matched to selected range, material and finish.',
    buyerFacingNote: 'Datasheets are shared after RFQ so unconfirmed dimensions or material data are not treated as final specification.',
    ctaText: 'Request Specification',
  },
  {
    id: 8,
    title: 'CAD / DWG / PDF Technical Drawings',
    productCodeOrRange: 'Selected product code',
    category: 'CAD & Section Drawings',
    documentType: 'Technical drawing',
    fileFormat: 'PDF / CAD',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Section drawings, CAD files and installation details for the selected profile.',
    buyerFacingNote: 'Drawings are matched to the exact product range and factory-confirmed section before release.',
    ctaText: 'Get Technical Drawings',
  },
  {
    id: 9,
    title: 'Full Installation Manuals',
    productCodeOrRange: 'Selected system',
    category: 'Installation Guides',
    documentType: 'Installation manual',
    fileFormat: 'PDF / Video',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Installation sequence and accessory guidance for clip-on, recessed, plaster-in and trim systems.',
    buyerFacingNote: 'Installation guidance must be matched to the selected system, substrate and project condition.',
    ctaText: 'Request Installation Guide',
  },
  {
    id: 10,
    title: 'Packaging & Loading Specification',
    productCodeOrRange: 'All ranges',
    category: 'Packaging & Logistics',
    documentType: 'Packaging specification',
    fileFormat: 'PDF',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Carton, pallet and loading data prepared for distributor and project shipments.',
    buyerFacingNote: 'Packaging data depends on selected length, finish, accessory set, MOQ and destination market.',
    ctaText: 'Request Packaging Data',
  },
  {
    id: 11,
    title: 'Accessory Compatibility Guide',
    productCodeOrRange: 'Selected product code',
    category: 'Technical Datasheets',
    documentType: 'Product datasheet',
    fileFormat: 'PDF',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Accessory matching guide for clips, corners, end caps, channels and finishing pieces.',
    buyerFacingNote: 'Accessory compatibility is confirmed by product range and selected factory configuration.',
    ctaText: 'Request Specification',
  },
  {
    id: 12,
    title: 'OEM / ODM Project Form',
    productCodeOrRange: 'Custom profile projects',
    category: 'OEM / ODM Resources',
    documentType: 'Project form',
    fileFormat: 'XLSX',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Structured project form for custom profile, finish, packing and sample requirements.',
    buyerFacingNote: 'Use this form after initial project review so the correct custom requirements are captured.',
    ctaText: 'Request a Quote',
  },
  {
    id: 13,
    title: 'Sample Policy',
    productCodeOrRange: 'All ranges',
    category: 'OEM / ODM Resources',
    documentType: 'Commercial terms',
    fileFormat: 'PDF',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Sample availability and preparation process for selected products and finishes.',
    buyerFacingNote: 'Finish samples are provided according to product range, market and available factory finish references.',
    ctaText: 'Request Finish Samples',
  },
  {
    id: 14,
    title: 'MOQ / Lead Time / Commercial Terms',
    productCodeOrRange: 'All ranges',
    category: 'Packaging & Logistics',
    documentType: 'Commercial terms',
    fileFormat: 'PDF',
    publicAvailability: 'Available after RFQ',
    shortDescription: 'Project-specific MOQ, lead time and commercial terms after range selection.',
    buyerFacingNote: 'Commercial information depends on selected profile, finish, quantity, packaging and destination.',
    ctaText: 'Request a Quote',
  },
  {
    id: 15,
    title: 'Test Reports',
    productCodeOrRange: 'Exact product and project only',
    category: 'Compliance Documents',
    documentType: 'Test report',
    fileFormat: 'PDF',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Test evidence only when a real report exists for the exact product and requirement.',
    buyerFacingNote: 'These documents are not public downloads and must be matched to the exact product before use.',
    ctaText: 'Request Specification',
  },
  {
    id: 16,
    title: 'Fire Rating Documents',
    productCodeOrRange: 'Exact tested product only',
    category: 'Compliance Documents',
    documentType: 'Compliance document',
    fileFormat: 'PDF',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Fire documentation is restricted to verified reports for the exact tested product.',
    buyerFacingNote: 'No fire rating should be published unless a matching report is uploaded and approved.',
    ctaText: 'Request Specification',
  },
  {
    id: 17,
    title: 'Waterproof / IP Rating Documents',
    productCodeOrRange: 'Exact tested product only',
    category: 'Compliance Documents',
    documentType: 'Compliance document',
    fileFormat: 'PDF',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Restricted evidence for exact products where a rating document exists.',
    buyerFacingNote: 'Do not treat sealing strips or LED channels as a rating without matching test evidence.',
    ctaText: 'Request Specification',
  },
  {
    id: 18,
    title: 'Regulatory Compliance Documents',
    productCodeOrRange: 'Exact product and market only',
    category: 'Compliance Documents',
    documentType: 'Compliance document',
    fileFormat: 'PDF',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Restricted compliance files supplied only when matched to the exact product and market.',
    buyerFacingNote: 'No compliance claim should be displayed publicly without a real uploaded document.',
    ctaText: 'Request Specification',
  },
  {
    id: 19,
    title: 'Material Grade Evidence',
    productCodeOrRange: 'Exact material batch or product',
    category: 'Compliance Documents',
    documentType: 'Material evidence',
    fileFormat: 'PDF',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Material grade evidence for exact product ranges and confirmed material batches.',
    buyerFacingNote: 'Material grades must be verified before being used in public specifications or quotations.',
    ctaText: 'Request Specification',
  },
  {
    id: 20,
    title: 'Customer OEM Drawings',
    productCodeOrRange: 'Customer-specific projects',
    category: 'OEM / ODM Resources',
    documentType: 'OEM drawing',
    fileFormat: 'CAD / DWG',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Customer-owned drawings for approved OEM / ODM projects.',
    buyerFacingNote: 'Customer OEM drawings are project-confidential and are never public downloads.',
    ctaText: 'Start a Custom Project',
  },
  {
    id: 21,
    title: 'Internal Cost / Factory Pricing',
    productCodeOrRange: 'Internal only',
    category: 'Packaging & Logistics',
    documentType: 'Internal commercial file',
    fileFormat: 'XLSX',
    publicAvailability: 'Internal / project only',
    shortDescription: 'Internal factory cost and pricing documents.',
    buyerFacingNote: 'Internal pricing files are not public resources.',
    ctaText: 'Request a Quote',
  },
];

export const FEATURED_DOWNLOAD_RESOURCES = [
  'Product catalogue',
  'Technical drawing',
  'Installation manual',
  'Packaging specification',
] as const satisfies readonly DocumentType[];

export const CATALOGUE_STRUCTURE = [
  'Cover',
  'About BINGE',
  'Product Categories',
  'Surface-Mounted Aluminum Skirting Boards',
  'Recessed, Shadow Gap & LED Systems',
  'Solid Wood, Stainless Steel & WPC Skirting',
  'Trims & Profiles',
  'OEM / ODM & RFQ',
];
