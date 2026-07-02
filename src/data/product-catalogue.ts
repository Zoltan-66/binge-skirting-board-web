export type Material = 'Aluminium' | 'Stainless Steel' | 'Solid Wood' | 'WPC';
export type Installation = 'Surface-Mounted' | 'Recessed' | 'Clip-on';
export type Application = 'Residential' | 'Hospitality' | 'Workplace' | 'Healthcare' | 'Commercial';
export type Category = 'Aluminium' | 'Recessed' | 'LED' | 'Solid Wood' | 'Stainless Steel' | 'WPC' | 'Trims';

export type Product = {
  code: string;
  name: string;
  desc: string;
  material: Material;
  installation: Installation;
  applications: Application[];
  category: Category;
  img: string;
  alt: string;
  slug: string;
  specificationStatus: 'Awaiting factory confirmation';
};

type RawProduct = Omit<Product, 'slug' | 'specificationStatus'> & { slug?: string };

const RAW_PRODUCTS: RawProduct[] = [
  { code: 'AS-CR', name: 'Crystal-Face Aluminium Skirting', desc: 'Decorative aluminium skirting family with a polished face treatment and clip-on installation.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-crystal.jpg', alt: 'Crystal-face aluminium skirting installed at a wall and floor junction' },
  { code: 'AS-MD', name: 'Morandi Finish Aluminium Skirting', desc: 'Muted colour aluminium range developed for contemporary residential and interior fit-out projects.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Workplace', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-morandi.jpg', alt: 'Morandi colour aluminium skirting in a modern interior' },
  { code: 'AS-WU', name: 'Woodgrain Upturned Aluminium Skirting', desc: 'Wood-effect aluminium face with a raised upper edge for a more decorative wall transition.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-woodgrain-upturned.jpg', alt: 'Woodgrain aluminium skirting with an upturned top edge' },
  { code: 'AS-DS', name: 'Dual-Seal Aluminium Skirting', desc: 'Aluminium profile family with upper and lower sealing strips; final dimensions are confirmed per enquiry.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial'], category: 'Aluminium', img: '/images/products/as-dual-seal.jpg', alt: 'Dual-seal aluminium skirting installed against wall and floor' },
  { code: 'AS-FF', name: 'Flat-Face Aluminium Skirting', desc: 'Straight architectural face available in multiple heights, colours and clip configurations.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial', 'Workplace'], category: 'Aluminium', img: '/images/products/as-flat-face.jpg', alt: 'Flat-face aluminium skirting profile range' },
  { code: 'AS-SR', name: 'Soft-Radius Aluminium Skirting', desc: 'Straight aluminium face with a small-radius edge for a softer transition at the top of the profile.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial'], category: 'Aluminium', img: '/images/products/as-soft-radius.jpg', alt: 'Soft-radius aluminium skirting installed in an interior' },
  { code: 'AS-MW', name: 'Minimal Woodgrain Aluminium Skirting', desc: 'Minimal straight aluminium profile finished with a wood-effect decorative surface.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Aluminium', img: '/images/products/as-minimal-woodgrain.jpg', alt: 'Minimal woodgrain aluminium skirting profile' },
  { code: 'AS-AT', name: 'Aluminium-Titanium Alloy Skirting', desc: 'Metal skirting family supplied in several profile heights and finish options for project selection.', material: 'Aluminium', installation: 'Clip-on', applications: ['Residential', 'Commercial', 'Workplace'], category: 'Aluminium', img: '/images/products/as-aluminium-titanium.jpg', alt: 'Aluminium-titanium alloy skirting installed at floor level' },
  { code: 'RS-SM', name: 'Seamless Recessed Aluminium Skirting', desc: 'Recessed profile designed for a low-visibility transition between the finished wall and floor.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Hospitality'], category: 'Recessed', img: '/images/products/rs-seamless.jpg', alt: 'Black seamless recessed aluminium skirting profile' },
  { code: 'RS-RE', name: 'Standard Recessed Aluminium Skirting', desc: 'Recessed aluminium family with separate base and visible face components for interior specification.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Commercial'], category: 'Recessed', img: '/images/products/rs-recessed.jpg', alt: 'Standard recessed black aluminium skirting at an internal corner' },
  { code: 'RS-FL', name: 'Flush-Mount Recessed Aluminium Skirting', desc: 'Flush-mounted recessed face for clean junctions in modern wall and panel systems.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Hospitality', 'Workplace'], category: 'Recessed', img: '/images/products/rs-flush.jpg', alt: 'Flush-mount recessed black aluminium skirting profiles' },
  { code: 'RS-PL', name: 'Plaster-In Aluminium Skirting', desc: 'Perforated plaster-in base profile with a visible lower face; sizes and finishes are confirmed on request.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Commercial'], category: 'Recessed', img: '/images/products/rs-plaster-in.jpg', alt: 'Black plaster-in aluminium skirting with perforated fixing flange' },
  { code: 'RS-LED', name: 'Recessed LED Aluminium Skirting', desc: 'Recessed aluminium profile with an integrated channel for floor-level linear lighting.', material: 'Aluminium', installation: 'Recessed', applications: ['Residential', 'Hospitality', 'Commercial'], category: 'LED', img: '/images/products/rs-led.jpg', alt: 'Recessed aluminium skirting with integrated LED lighting' },
  { code: 'WS-TG', name: 'TG Clip-On Solid Wood Skirting', desc: 'BINGE TG system with a separate base and solid-wood face board for concealed installation.', material: 'Solid Wood', installation: 'Clip-on', applications: ['Residential', 'Hospitality'], category: 'Solid Wood', img: '/images/products/ws-tg-scene.jpg', alt: 'TG clip-on solid wood skirting system installation sequence', slug: 'tg-clip-on-solid-wood-skirting-system' },
  { code: 'WS-P3', name: 'Three-Side Painted Solid Wood Skirting', desc: 'Solid-wood skirting range with painted faces and several profile heights for interior projects.', material: 'Solid Wood', installation: 'Surface-Mounted', applications: ['Residential', 'Hospitality'], category: 'Solid Wood', img: '/images/products/ws-three-side-painted.jpg', alt: 'Three-side painted solid wood skirting in black and white finishes' },
  { code: 'WS-XQ', name: 'Xuanwu & Qilin Solid Wood Series', desc: 'Decorative solid-wood profile family supplied in multiple heights and face geometries.', material: 'Solid Wood', installation: 'Surface-Mounted', applications: ['Residential', 'Hospitality'], category: 'Solid Wood', img: '/images/products/ws-xuanwu-qilin.jpg', alt: 'Decorative solid wood skirting installed around an internal corner' },
  { code: 'SS-201', name: 'Classic 201 Stainless Steel Skirting', desc: 'Classic stainless-steel skirting family available in several heights and surface colours.', material: 'Stainless Steel', installation: 'Surface-Mounted', applications: ['Commercial', 'Hospitality'], category: 'Stainless Steel', img: '/images/products/ss-201-classic.jpg', alt: 'Classic stainless steel skirting installed in an interior' },
  { code: 'SS-201N', name: 'New-Series 201 Stainless Steel Skirting', desc: 'Updated stainless-steel face profile with coordinated accessories and finish options.', material: 'Stainless Steel', installation: 'Surface-Mounted', applications: ['Commercial', 'Hospitality'], category: 'Stainless Steel', img: '/images/products/ss-201-new.jpg', alt: 'New-series stainless steel skirting in multiple finishes' },
  { code: 'WP-55/100', name: 'WPC Skirting — 55 mm & 100 mm Series', desc: 'Clip-on WPC skirting family offered in two principal height groups and multiple decorative surfaces.', material: 'WPC', installation: 'Clip-on', applications: ['Residential', 'Commercial'], category: 'WPC', img: '/images/products/wp-55-100.jpg', alt: 'WPC skirting profile with concealed wall clip' },
  { code: 'TR-L', name: 'L-Shaped Aluminium Edge Trim', desc: 'L-shaped aluminium trim family for exposed edges, panel junctions and finishing details.', material: 'Aluminium', installation: 'Surface-Mounted', applications: ['Residential', 'Commercial', 'Hospitality'], category: 'Trims', img: '/images/products/tr-l-edge.jpg', alt: 'L-shaped aluminium edge trim installed at a panel edge' },
  { code: 'TR-FC', name: 'F / C-Shaped Aluminium Trim', desc: 'F- and C-shaped aluminium finishing profiles for tile and panel edge conditions.', material: 'Aluminium', installation: 'Surface-Mounted', applications: ['Residential', 'Commercial'], category: 'Trims', img: '/images/products/tr-fc-edge.jpg', alt: 'Black C-shaped aluminium finishing trim with profile dimensions' },
  { code: 'TR-TU', name: 'T / U-Shaped Aluminium Transition Trim', desc: 'T- and U-shaped transition profiles for joining and finishing adjacent surface materials.', material: 'Aluminium', installation: 'Surface-Mounted', applications: ['Residential', 'Commercial', 'Hospitality'], category: 'Trims', img: '/images/products/tr-tu-transition.jpg', alt: 'Black T-shaped aluminium transition trim with profile dimensions' },
];

const makeSlug = (product: RawProduct) => product.slug ?? `${product.code}-${product.name}`
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export const PRODUCT_CATALOGUE: Product[] = RAW_PRODUCTS.map(product => ({
  ...product,
  slug: makeSlug(product),
  specificationStatus: 'Awaiting factory confirmation',
}));

export const getProductBySlug = (slug: string) => PRODUCT_CATALOGUE.find(product => product.slug === slug);
