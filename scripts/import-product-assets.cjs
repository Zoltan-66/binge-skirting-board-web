/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp');

const root = '/tmp/binge-products/产品图文';
const output = path.join(process.cwd(), 'public/images/products');

const assets = [
  ['1 铝合金踢脚线/1 水晶款/主图+SKU图/素材图/场景图.jpg', 'as-crystal.jpg'],
  ['1 铝合金踢脚线/2 莫兰迪款/主图+SKU图/素材图/场景图.jpg', 'as-morandi.jpg'],
  ['1 铝合金踢脚线/3 网红木纹翘边款/主图+SKU图/素材图/场景图.jpg', 'as-woodgrain-upturned.jpg'],
  ['1 铝合金踢脚线/4 上下带防尘防水胶条款/主图+SKU图/素材图/场景图.jpg', 'as-dual-seal.jpg'],
  ['1 铝合金踢脚线/5 直板款/主图+SKU图/素材图/场景图.jpg', 'as-flat-face.jpg'],
  ['1 铝合金踢脚线/6 直板款小圆弧/主图+SKU图/素材图/场景图.jpg', 'as-soft-radius.jpg'],
  ['1 铝合金踢脚线/7 极简木纹直板款/主图+SKU图/素材图/场景图.jpg', 'as-minimal-woodgrain.jpg'],
  ['1 铝合金踢脚线/8 铝钛合金踢脚线/主图+SKU图/素材图/场景图.jpg', 'as-aluminium-titanium.jpg'],
  ['4 铝合金内嵌踢脚线/1 铝合金无痕踢脚线/主图+SKU图/SKU图/组 1.jpg', 'rs-seamless.jpg', 180, 0],
  ['4 铝合金内嵌踢脚线/2 铝合金内嵌踢脚线/主图+SKU图/SKU图/2 7字踢脚线SKU图/组 1.jpg', 'rs-recessed.jpg', 180, 0],
  ['4 铝合金内嵌踢脚线/3 铝合金内嵌平装踢脚线/主图+SKU图/SKU图/40内嵌/哑黑.jpg', 'rs-flush.jpg', 180, 0],
  ['4 铝合金内嵌踢脚线/4 铝合金灯带内嵌踢脚线/主图+SKU图/素材图/场景图.jpg', 'rs-led.jpg'],
  ['4 铝合金内嵌踢脚线/5 铝合金批灰踢脚线/主图+SKU图/SKU图/批灰免开槽踢脚线/20厘/哑黑.jpg', 'rs-plaster-in.jpg', 180, 0],
  ['3 实木踢脚线/15 卡扣式实木踢脚线/主图+SKU图/素材图/场景图.jpg', 'ws-tg-scene.jpg'],
  ['3 实木踢脚线/14 实木三面烤漆系列/主图+SKU图/素材图/场景图.jpg', 'ws-three-side-painted.jpg'],
  ['3 实木踢脚线/3 玄武.麒麟系列/场景图+透明图/实木场景图2025-4-25-11.jpg', 'ws-xuanwu-qilin.jpg'],
  ['2 不锈钢踢脚线/不锈钢201材质/素材图/场景图1.jpg', 'ss-201-classic.jpg'],
  ['2 不锈钢踢脚线/不锈钢201材质【新款】/主图+SKU图/素材图/场景图.jpg', 'ss-201-new.jpg'],
  ['7 竹木纤维踢脚线/木塑踢脚线5.5公分10公分/SKU图+主图/H系列SKU图/组 1.jpg', 'wp-55-100.jpg', 120, 245, 180, 0],
  ['5 铝合金收边条/1 铝合金L型收边条/素材图/不等边收边条/场景图.jpg', 'tr-l-edge.jpg'],
  ['5 铝合金收边条/2 铝合金F+C型收边条/主图+SKU图/SKU图/C型锯齿收扣/10厘/哑黑.jpg', 'tr-fc-edge.jpg', 180, 0],
  ['5 铝合金收边条/3 铝合金T+U型收边条/主图+SKU图/SKU图/T型Z型工字型锯齿双边/10厘/哑黑.jpg', 'tr-tu-transition.jpg', 180, 0],
];

const gallery = [
  ['3 实木踢脚线/15 卡扣式实木踢脚线/主图+SKU图/素材图/白底图.jpg', 'ws-tg-white.jpg'],
  ['3 实木踢脚线/15 卡扣式实木踢脚线/主图+SKU图/素材图/卡扣.jpg', 'ws-tg-clip-detail.jpg'],
  ['3 实木踢脚线/15 卡扣式实木踢脚线/主图+SKU图/素材图/透明图.png', 'ws-tg-isolated.jpg'],
];

async function card([source, destination, cropTop = 0, cropBottom = 0, cropLeft = 0, cropRight = 0]) {
  const input = path.join(root, source);
  let pipeline = sharp(input).flatten({ background: '#f7f7f7' });
  const meta = await pipeline.metadata();
  if (cropTop || cropBottom || cropLeft || cropRight) {
    pipeline = pipeline.extract({ left: cropLeft, top: cropTop, width: meta.width - cropLeft - cropRight, height: meta.height - cropTop - cropBottom });
  }
  await pipeline.resize(1200, 900, { fit: 'cover', position: 'centre' }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(output, destination));
}

async function square([source, destination]) {
  await sharp(path.join(root, source))
    .flatten({ background: '#f7f7f7' })
    .resize(1200, 1200, { fit: 'cover', position: 'centre', withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(output, destination));
}

async function main() {
  await fs.mkdir(output, { recursive: true });
  await Promise.all(assets.map(card));
  await Promise.all(gallery.map(square));
  console.log(`Prepared ${assets.length + gallery.length} product assets in ${output}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
