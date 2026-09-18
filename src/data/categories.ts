import type { VoltageCategory } from './types'

export const voltageCategories: VoltageCategory[] = [
  {
    id: 'low-voltage',
    index: '01',
    name: 'ALÇAK GERİLİM',
    title: 'Low Voltage',
    description:
      'Dağıtım, koruma ve bağlantı için endüstri lideri markaların bir araya geldiği alçak gerilim ürün ailesi.',
  },
  {
    id: 'medium-voltage',
    index: '02',
    name: 'ORTA GERİLİM',
    title: 'Medium Voltage',
    description:
      'Trafo merkezleri ve dağıtım hücreleri ile şebeke altyapısının omurgasını oluşturan orta gerilim çözümleri.',
  },
]

export const companyContent = {
  name: 'Green Pi Enerji',
  heroTitle: ['GELECEĞİN', 'ENERJİSİNİ', 'KURUYORUZ.'],
  heroSubtitle: 'Alçak ve orta gerilim ürünlerini keşfedebileceğiniz interaktif dijital katalog.',
  about: {
    kicker: 'ŞİRKET',
    title: 'Mühendislik odaklı tedarik.',
    body: 'Green Pi Enerji, alçak ve orta gerilim şebekelerinde kullanılan bileşenleri, sahada karşılaşılan gerçek mühendislik problemlerine çözüm olacak şekilde bir araya getirir. Uluslararası markaların ürün gamını, yerel projelerin teknik gereksinimleriyle buluşturuyoruz.',
  },
  vision: {
    index: '01',
    kicker: 'VİZYON',
    title: 'Daha bağlantılı ve\nsürdürülebilir bir\nenerji altyapısı.',
    body: 'Şebekelerin dijitalleştiği, enerjinin daha akıllı yönetildiği bir gelecekte; güvenilir bileşen tedarikinin bu dönüşümün temeli olduğuna inanıyoruz.',
  },
  mission: {
    index: '02',
    kicker: 'MİSYON',
    title: 'Doğru ürünü, doğru\nprojeye, doğru zamanda\nulaştırmak.',
    body: 'Sahadaki mühendislerin ihtiyaç duyduğu teknik derinliği, geniş stok kapasitesi ve hızlı tedarik süreçleriyle destekliyoruz.',
  },
  closing: {
    kicker: 'GREEN PI ENERJİ',
    body: 'Projeniz için doğru elektrik altyapısı çözümlerini birlikte tasarlayalım.',
  },
  contact: {
    email: 'info@greenpi.com.tr',
    phone: '+90 546 858 20 20',
    address: 'Gümüş Cd. No:40, Konutkent, 06810 Yenimahalle/Ankara',
  },
}
