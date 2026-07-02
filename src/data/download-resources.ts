export type DocumentType =
  | 'Product Catalogue'
  | 'Profile Drawing'
  | 'Installation Instructions'
  | 'Test Report'
  | 'Packaging Specifications';

export type ProductDocumentCategory =
  | 'All Products'
  | 'Aluminium Skirting'
  | 'Recessed Systems'
  | 'LED Systems'
  | 'Solid Wood'
  | 'Stainless Steel'
  | 'WPC Skirting'
  | 'Trims & Profiles';

export type FileFormat = 'PDF' | 'DXF' | 'STEP' | 'ZIP';

export type DownloadResource = {
  id: number;
  title: string;
  code: string;
  category: ProductDocumentCategory;
  docType: DocumentType;
  formats: FileFormat[];
  availability: 'Available on request' | 'In preparation' | 'Project-specific';
  note: string;
};

export const DOWNLOAD_RESOURCES: DownloadResource[] = [
  {
    id: 1,
    title: 'BINGE Product Catalogue',
    code: 'All Products',
    category: 'All Products',
    docType: 'Product Catalogue',
    formats: ['PDF'],
    availability: 'In preparation',
    note: 'Full English catalogue covering aluminium, solid wood, WPC, stainless steel, LED and trim systems.',
  },
  {
    id: 2,
    title: 'Aluminium Skirting Range Overview',
    code: 'AS-Range',
    category: 'Aluminium Skirting',
    docType: 'Product Catalogue',
    formats: ['PDF'],
    availability: 'Available on request',
    note: 'Modern aluminium profiles, finish options, fixing methods and project-use guidance.',
  },
  {
    id: 3,
    title: 'Solid Wood & WPC Skirting Range Overview',
    code: 'WS/WP-Range',
    category: 'Solid Wood',
    docType: 'Product Catalogue',
    formats: ['PDF'],
    availability: 'Available on request',
    note: 'Solid wood, WPC and clip-on systems with finish and installation references.',
  },
  {
    id: 4,
    title: 'LED Skirting Systems Overview',
    code: 'SL-Range',
    category: 'LED Systems',
    docType: 'Product Catalogue',
    formats: ['PDF'],
    availability: 'Available on request',
    note: 'LED-ready skirting and recessed lighting systems for commercial and hospitality projects.',
  },
  {
    id: 5,
    title: 'Aluminium Profile Drawing Pack',
    code: 'AS-Range',
    category: 'Aluminium Skirting',
    docType: 'Profile Drawing',
    formats: ['DXF', 'PDF', 'STEP'],
    availability: 'Project-specific',
    note: 'Cross-sections, fixing details and 3D files are matched to the selected profile and finish.',
  },
  {
    id: 6,
    title: 'Recessed & Shadow Gap Drawing Pack',
    code: 'RS-Range',
    category: 'Recessed Systems',
    docType: 'Profile Drawing',
    formats: ['DXF', 'PDF', 'STEP'],
    availability: 'Project-specific',
    note: 'Recessed, shadow-gap and plaster-in details for architectural drawing packages.',
  },
  {
    id: 7,
    title: 'TG Clip-On Solid Wood System Drawing Pack',
    code: 'WS-TG',
    category: 'Solid Wood',
    docType: 'Profile Drawing',
    formats: ['DXF', 'PDF'],
    availability: 'Project-specific',
    note: 'Clip-on rail, profile section, corner and installation details for the TG system.',
  },
  {
    id: 8,
    title: 'Stainless Steel Skirting Drawing Pack',
    code: 'SS-Range',
    category: 'Stainless Steel',
    docType: 'Profile Drawing',
    formats: ['DXF', 'PDF'],
    availability: 'Project-specific',
    note: 'Hospitality, kitchen, healthcare and laboratory stainless-steel profile drawings.',
  },
  {
    id: 9,
    title: 'Clip-On Skirting Installation Guide',
    code: 'AS/WS',
    category: 'All Products',
    docType: 'Installation Instructions',
    formats: ['PDF'],
    availability: 'Available on request',
    note: 'Step-by-step guidance for clip rail fixing, wall preparation, corners and finishing.',
  },
  {
    id: 10,
    title: 'Recessed & LED System Installation Guide',
    code: 'RS/SL',
    category: 'Recessed Systems',
    docType: 'Installation Instructions',
    formats: ['PDF'],
    availability: 'Available on request',
    note: 'Installation sequence for recessed channels, LED integration and finish coordination.',
  },
  {
    id: 11,
    title: 'Material & Finish Test Reports',
    code: 'Selected Profiles',
    category: 'All Products',
    docType: 'Test Report',
    formats: ['PDF'],
    availability: 'Project-specific',
    note: 'Relevant SGS, material, surface finish or fire-performance documents are supplied by product and market requirement.',
  },
  {
    id: 12,
    title: 'Export Packaging & Loading Specification',
    code: 'All Products',
    category: 'All Products',
    docType: 'Packaging Specifications',
    formats: ['PDF'],
    availability: 'Available on request',
    note: 'Carton, pallet, labeling and container-loading references for distributor and project orders.',
  },
];

export const DOWNLOAD_CATEGORIES: ('All Categories' | ProductDocumentCategory)[] = [
  'All Categories',
  'All Products',
  'Aluminium Skirting',
  'Recessed Systems',
  'LED Systems',
  'Solid Wood',
  'Stainless Steel',
  'WPC Skirting',
  'Trims & Profiles',
];

export const DOWNLOAD_DOCUMENT_TYPES: ('All Types' | DocumentType)[] = [
  'All Types',
  'Product Catalogue',
  'Profile Drawing',
  'Installation Instructions',
  'Test Report',
  'Packaging Specifications',
];

export const FEATURED_DOWNLOAD_RESOURCES = [
  'Product Catalogue',
  'Profile Drawing',
  'Installation Instructions',
  'Test Report',
] as const satisfies readonly DocumentType[];
