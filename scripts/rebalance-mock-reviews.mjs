import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/** Hedef ortalama: ürün id'sine göre 3.3 – 4.4 arası */
function targetAvg(id, badge) {
  if (badge === "En Beğenilen") return 4.2;
  if (badge === "Çok Satan") return 4.0;
  const targets = [3.4, 3.6, 3.8, 4.0, 4.2, 3.5, 3.9, 4.1];
  return targets[id % targets.length];
}

const CRITICAL_TEXT = {
  1: [
    "Beklentimin çok altında kaldı. İade sürecini başlattım.",
    "Kısa sürede arıza verdi, müşteri hizmetleri yavaş döndü.",
    "Fiyatına göre kalite çok düşük, tavsiye etmiyorum.",
  ],
  2: [
    "İdare eder ama ciddi eksikleri var. Bir daha almam.",
    "Kullanım kolaylığı iyi de dayanıklılık zayıf.",
    "Açıklamadaki özelliklerin bir kısmı yok veya zayıf.",
  ],
  3: [
    "Fena değil ama mükemmel de değil. Fiyatına göre orta seviye.",
    "Bazı özellikler iyi, bazıları hayal kırıklığı. Ortalama bir ürün.",
    "Genel olarak idare eder; daha iyisini bu fiyata bulabilirsiniz.",
  ],
};

const POSITIVE_TEXT = {
  4: [
    "Genel olarak memnunum, küçük kusurlar var ama alınır.",
    "Kaliteli hissettiriyor, birkaç detay geliştirilebilir.",
    "İhtiyacımı karşılıyor, tam puan değil ama tavsiye ederim.",
  ],
  5: [
    "Çok memnun kaldım, beklentimi karşıladı.",
    "Kalite ve fiyat dengesi iyi, tekrar alırım.",
    "Kullanımı rahat, tavsiye ederim.",
  ],
};

function avg(reviews) {
  if (!reviews.length) return 0;
  return reviews.reduce((a, r) => a + r.stars, 0) / reviews.length;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function rebalanceProduct(product) {
  const reviews = [...product.reviews];
  const target = targetAvg(product.id, product.badge);
  let current = avg(reviews);

  // Çok pozitifse: en yüksek yıldızlıları düşür
  if (current > target + 0.15) {
    const sorted = [...reviews].sort((a, b) => b.stars - a.stars);
    for (const r of sorted) {
      if (current <= target + 0.05) break;
      if (r.stars >= 5) {
        r.stars = 4;
        current = avg(reviews);
      } else if (r.stars === 4 && current > target) {
        r.stars = 3;
        current = avg(reviews);
      }
    }
  }

  // Hâlâ yüksekse bir 2 yıldız ekle (mevcut yorumu güncelle)
  if (current > target + 0.2 && !reviews.some((r) => r.stars <= 2)) {
    const idx = reviews.findIndex((r) => r.stars === 3);
    const i = idx >= 0 ? idx : reviews.length - 1;
    reviews[i].stars = 2;
    reviews[i].text = pick(CRITICAL_TEXT[2], product.id + i);
    current = avg(reviews);
  }

  // Çok düşükse hafif yükselt
  if (current < target - 0.25) {
    const low = reviews.find((r) => r.stars <= 2);
    if (low) {
      low.stars = 3;
      low.text = pick(CRITICAL_TEXT[3], product.id);
    }
  }

  // Düşük yıldızlı yorum metinlerini eleştirel yap
  reviews.forEach((r, i) => {
    if (r.stars <= 3 && !r.text.match(/hayal|arıza|iade|zayıf|düşük|ortala|idare|kusur|eksik/i)) {
      r.text = pick(CRITICAL_TEXT[r.stars] || CRITICAL_TEXT[3], product.id + i);
    }
    if (r.stars === 4 && r.text.match(/muhteşem|mükemmel|harika|inanılmaz|efsane/i)) {
      r.text = pick(POSITIVE_TEXT[4], product.id + i);
    }
  });

  const rating = Math.round(avg(reviews) * 10) / 10;
  return {
    ...product,
    reviews,
    reviewCount: reviews.length,
    rating,
  };
}

for (const site of ["carsila", "shoprill"]) {
  const filePath = path.join(root, site, "data", "products.json");
  const products = JSON.parse(fs.readFileSync(filePath, "utf8")).map(rebalanceProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2) + "\n", "utf8");

  const avgs = products.map((p) => p.rating);
  const low = products.filter((p) => p.reviews.some((r) => r.stars <= 2)).length;
  console.log(
    `${site}: ortalama ${(avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(2)}, ` +
      `≤2★ içeren ${low}/${products.length} ürün`
  );
}
