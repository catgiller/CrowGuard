import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const SLUG_MAP = {
  "samsung-galaxy-a55-5g": "solvex-galax-a55-5g-128gb",
  "sony-wh-1000xm5-kulaklik": "aurex-nc-5000xm-kulaklik",
  "apple-ipad-10-nesil-wifi": "nexium-pad-10-nesil-wifi",
  "xiaomi-smart-band-8-pro": "mirix-smart-band-8-pro",
  "anker-powercore-20000-powerbank": "voltex-powercore-20000-powerbank",
  "delonghi-magnifica-evo-kahve": "caldero-magnifica-evo-kahve",
  "philips-blender-hr2221": "luxon-blender-br2221",
  "philips-hue-akilli-ampul-e27": "luxon-hue-akilli-ampul-e27",
  "columbia-trek-sweatshirt": "arcova-trek-sweatshirt",
  "nike-air-max-270-spor-ayakkabi": "strida-airmax-270-spor-ayakkabi",
  "columbia-titanium-winter-mont": "arcova-thermashield-kis-mont",
  "mango-mini-deri-omuz-canta": "velia-mini-deri-omuz-canta",
  "rayban-rb3025-gunes-gozlugu": "solvista-sv3025-gunes-gozlugu",
  "cerave-retinol-serum-30ml": "dermace-retinol-serum-30ml",
  "gillette-labs-isitmali-tiraz-seti": "razex-labs-isitmali-tiraz-seti",
  "dyson-supersonic-sac-kurutma": "xyron-supersonic-sac-kurutma",
  "chanel-chance-eau-tendre-edt-100ml": "elare-charme-eau-tendre-edt-100ml",
  "oralb-io-series-9-elektrikli-fircasi": "dentix-iq-series-9-elektrikli-fircasi",
  "manduka-pro-yoga-mati": "zenuga-pro-yoga-mati",
  "giro-register-mips-bisiklet-kaski": "veloce-shield-mips-bisiklet-kaski",
  "myprotein-impact-whey-1kg-cikolatali": "maxpro-impact-whey-1kg-cikolatali",
  "domyos-t520b-kosu-bandi": "rythmex-t520b-kosu-bandi",
  "quechua-mh100-kamp-cadiri": "campora-mh100-kamp-cadiri",
  "vans-old-skool-charms-kadin-beyaz": "chaarm-lx-retro-charms-kadin-beyaz",
  "fifine-ampligame-usb-xlr-mikrofon": "soundix-ampligame-usb-xlr-mikrofon",
  "xbox-wireless-controller-siyah-9nesil": "nexplay-wireless-controller-siyah-9nesil",
  "defacto-klasik-genis-paca-pantolon": "factora-klasik-genis-paca-pantolon",
};

const IMAGE_FIXES = {
  "solvex-galax-a55-5g-128gb": [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80",
  ],
  "mirix-smart-band-8-pro": [
    "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b5?w=600&q=80",
    "https://images.unsplash.com/photo-1557935738-59d1aeadf9e6?w=600&q=80",
    "https://images.unsplash.com/photo-1508685096489-7cfad8fb3a6e?w=600&q=80",
  ],
  "luxon-hue-akilli-ampul-e27": [
    "https://images.unsplash.com/photo-1507473886154-e7cc7a3c7f7e?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
  ],
  "arcova-thermashield-kis-mont": [
    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b5ec?w=600&q=80",
    "https://images.unsplash.com/photo-1544923246-77307dd270b5?w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  ],
  "gizrain-siyah-gabardin-oversize-ceket": [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    "https://images.unsplash.com/photo-1521223890158-f9f7c036d1d1?w=600&q=80",
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80",
  ],
  "veloce-shield-mips-bisiklet-kaski": [
    "https://images.unsplash.com/photo-1585776245991-aa3e66f2c2c0?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    "https://images.unsplash.com/photo-1485965120189-e8f992113851?w=600&q=80",
  ],
  "dentix-iq-series-9-elektrikli-fircasi": [
    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&q=80",
    "https://images.unsplash.com/photo-1559592371-7d3d1a2d4e6d?w=600&q=80",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
  ],
  "nexplay-wireless-controller-siyah-9nesil": [
    "https://images.unsplash.com/photo-1606144047084-dbf4de440d0f?w=600&q=80",
    "https://images.unsplash.com/photo-1612287230202-1ff1d85c1d53?w=600&q=80",
    "https://images.unsplash.com/photo-1592840496694-26d035b52b6b?w=600&q=80",
  ],
  "rythmex-t520b-kosu-bandi": [
    "https://images.unsplash.com/photo-1576678927484-cc9079570885?w=600&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618d8d?w=600&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
  ],
  "mermaidcore-beyaz-buzgulu-y2k-crop": [
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1ad04?w=600&q=80",
  ],
};

const TEXT_REPLACEMENTS = [
  [/360 Reality Audio/gi, "360 Surround Audio"],
  [/Liquid Retina/gi, "Pro Vision"],
  [/A14 Bionic/gi, "Hexon 1480"],
  [/A14 nesli/gi, "Hexon nesli"],
  [/iPadOS/gi, "PadOS"],
  [/\bXM4\b/g, "NC-4000"],
  [/\bXM5\b/g, "NC-5000"],
  [/Xbox Series X/gi, "Nexplay Series X"],
  [/Xbox\/PC/gi, "Konsol/PC"],
  [/\bXbox\b/g, "Nexplay"],
  [/Galax A32/gi, "Galax A32"],
  [/Önceki telefonum A32'ydi/gi, "Önceki telefonum Galax A32'ydi"],
  [/Sony WH-1000XM5/gi, "Aurex NC-5000XM Kablosuz Kulaklık"],
  [/CeraVe Retinol Serum/gi, "Dermaçe Retinol Serum"],
  [/Nike Air Max 270/gi, "Strida AirMax 270"],
  [/Xiaomi Smart Band 8 Pro/gi, "Mirix Smart Band 8 Pro"],
  [/Manduka PRO Yoga/gi, "Zenuga PRO Yoga"],
  [/Dyson Supersonic/gi, "Xyron Supersonic"],
  [/Chanel Chance Eau Tendre/gi, "Élare Charme Eau Tendre"],
  [/Xbox Wireless Controller/gi, "Nexplay Wireless Controller"],
  [/Levi's 501/gi, "Factora 501"],
  [/Apple AirPods Pro/gi, "Aurex Buds Pro"],
  [/Dyson V15 Detect/gi, "Xyron V15 Detect"],
  [/Samsung QLED 4K TV/gi, "Solvex QLED 4K TV"],
  [/Kindle Paperwhite/gi, "Nexium Paper 11"],
];

function replaceText(value) {
  if (typeof value !== "string") return value;
  let out = value;
  for (const [pattern, replacement] of TEXT_REPLACEMENTS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function walkStrings(obj) {
  if (typeof obj === "string") return replaceText(obj);
  if (Array.isArray(obj)) return obj.map(walkStrings);
  if (obj && typeof obj === "object") {
    const next = {};
    for (const [key, value] of Object.entries(obj)) {
      next[key] = walkStrings(value);
    }
    return next;
  }
  return obj;
}

function avgRating(reviews) {
  if (!reviews?.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.stars, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

function fixProduct(product) {
  let next = { ...product };

  if (SLUG_MAP[next.slug]) {
    next.slug = SLUG_MAP[next.slug];
  }

  next = walkStrings(next);

  if (IMAGE_FIXES[next.slug]) {
    next.images = IMAGE_FIXES[next.slug];
  }

  next.reviewCount = next.reviews?.length ?? 0;
  next.rating = avgRating(next.reviews);
  delete next.starRatings;

  return next;
}

for (const site of ["carsila", "shoprill"]) {
  const filePath = path.join(root, site, "data", "products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8")).map(fixProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2) + "\n", "utf8");
  console.log(`Fixed ${site}: ${products.length} products`);
}
