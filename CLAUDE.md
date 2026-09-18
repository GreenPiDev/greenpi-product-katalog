# PREMIUM İNTERAKTİF ELEKTRİK ÜRÜNLERİ KATALOĞU

KATALOG dili türkçe olacak. benimle türkçe konuşmanı istiyorum.

Lenis ve sticky zımbırtıları kullanabiliriz ihtiyaç olursa.

yine ihtiyaç halinde : /Users/mustafa/my-desktop/projects/0-GREEN-PI-WORKS/98-site-tasarimlari/te-sunum projesinden örnek alabilirsin bazı şeyler için

katalog marka sıralaması: alçak gerilim ürünlerimiz -> TE , Aite, inotel, raycap, siemens, schneider, abb,miltera , exproof(atex), gromtor-sertec, pannect sonra orta gerilim bölümü geliyor ona markasız direkt ürünleri göstercez (trafo köşkü,trafo hücresi gibi)

React + Vite + TypeScript kullanarak tek sayfalık (Single Page) premium ve interaktif bir dijital ürün kataloğu geliştir.

Bu proje klasik bir kurumsal web sitesi veya e-ticaret sitesi gibi görünmemeli.

Amaç; kullanıcının sayfayı scroll ederek elektrik ürünlerini incelemesini sağlayan, **premium, modern, teknik, deneyimsel ve akıcı bir dijital katalog deneyimi** oluşturmaktır.

---

# 1. TEKNOLOJİ

Kullanılacak teknolojiler:

* React
* Vite
* TypeScript
* Framer Motion / Motion for React
* Modern CSS
* Gerekli yerlerde CSS Modules veya temiz bir component-based styling yapısı

Gereksiz dependency kullanma.

Kod:

* component-based
* reusable
* type-safe
* temiz
* sürdürülebilir
* kolay genişletilebilir

olmalı.

Ürünler ve markalar mümkün olduğunca **data-driven** tasarlanmalı.

Örneğin:

```ts
type Product = {
  name: string;
  description: string;
  image: string;
  category: string;
};

type Brand = {
  name: string;
  description: string;
  accentColor: string;
  backgroundColor: string;
  products: Product[];
};
```

Daha sonra gerçek ürünleri kolayca ekleyebileceğim bir yapı oluştur.

---

# 2. GENEL TASARIM FELSEFESİ

Tasarımın ana karakteri:

* Premium
* Minimal
* Teknik
* Endüstriyel
* Modern
* Architectural
* Editorial
* Sophisticated
* High-end B2B
* Güçlü typography
* Büyük görseller
* Bol whitespace
* Smooth animation
* Subtle motion

Hedef his:

**"Premium mimarlık sitesi + modern endüstriyel marka + interaktif ürün kataloğu"**

karışımı gibi hissettirmeli.

Kesinlikle klasik:

* Bootstrap tarzı
* sıradan corporate website
* dashboard
* e-commerce grid
* çok fazla card
* çok fazla border-radius
* çok fazla shadow
* ucuz gradient
* aşırı glassmorphism

kullanma.

Tasarımın kaliteli görünmesinin temelinde:

**tipografi + boşluk + grid + imagery + motion + renk kullanımı**

olsun.

---

# 3. SAYFA YAPISI

Single Page uygulamada genel yapı:

```text
HERO
   ↓
COMPANY
   ↓
VISION
   ↓
MISSION
   ↓
PRODUCT CATEGORIES
   ↓
LOW VOLTAGE
   ↓
BRAND 01
   ↓
HORIZONTAL PRODUCTS
   ↓
BRAND 02
   ↓
HORIZONTAL PRODUCTS
   ↓
BRAND 03
   ↓
HORIZONTAL PRODUCTS
   ↓
MEDIUM VOLTAGE
   ↓
BRAND 01
   ↓
HORIZONTAL PRODUCTS
   ↓
BRAND 02
   ↓
HORIZONTAL PRODUCTS
   ↓
...
   ↓
COMPANY / CLOSING STATEMENT
   ↓
CONTACT
```

Başlangıçta gerçek içerikler yerine kaliteli placeholder içerikler kullanılabilir.

Ancak component ve data yapısı gerçek içerikleri sonradan kolayca ekleyebileceğim şekilde hazırlanmalı.

---

# 4. EN ÖNEMLİ KISIM — SCROLL DENEYİMİ

Bu projenin en önemli özelliği scroll deneyimi.

Sayfa sadece normal vertical scroll'dan oluşmamalı.

Hem:

**Vertical Scroll**

hem de:

**Horizontal Scroll**

kullanılmalı.

Örneğin:

```text
Vertical
   ↓
Company
   ↓
Vision
   ↓
Mission
   ↓
Low Voltage
   ↓
TE Connectivity
   ↓
Horizontal
→ Product 1
→ Product 2
→ Product 3
→ Product 4
   ↓
Vertical
   ↓
Siemens
   ↓
Horizontal
→ Product 1
→ Product 2
→ Product 3
   ↓
Vertical
   ↓
Medium Voltage
   ↓
...
```

Bu geçişler kullanıcıya doğal hissettirmeli.

---

# 5. HORIZONTAL SCROLL NASIL ÇALIŞMALI?

Bir marka bölümüne geldiğimizde örneğin:

## TE Connectivity

viewport içinde büyük bir horizontal product gallery oluşsun.

Örneğin:

```text
┌──────────────────────────────────────────────┐
│                                              │
│  TE CONNECTIVITY                             │
│                                              │
│  Electrical Connection Solutions             │
│                                              │
│     PRODUCT 01    PRODUCT 02    PRODUCT 03  │
│        →              →             →        │
│                                              │
└──────────────────────────────────────────────┘
```

Kullanıcı normal şekilde mouse wheel ile aşağı doğru scroll ettiğinde:

**vertical scroll → horizontal movement**

dönüşümü gerçekleşsin.

Yani kullanıcı ekstra bir horizontal scrollbar kullanmak zorunda kalmasın.

Vertical scroll progress'i horizontal translate değerine dönüştür.

Örneğin konsept olarak:

```ts
horizontalProgress = verticalScrollProgress
```

ve:

```ts
translateX = -horizontalProgress * totalHorizontalDistance
```

mantığı kullanılabilir.

Bölümün başlangıcında:

```text
vertical scroll
      ↓
horizontal section starts
      ↓
products move horizontally
      ↓
last product
      ↓
horizontal section ends
      ↓
vertical scrolling resumes
```

olmalı.

---

# 6. HORIZONTAL SCROLL TRANSITION

Horizontal section kullanıcıyı sonsuza kadar kilitlememeli.

Kullanıcı:

```text
Brand intro
      ↓
Product 1
      ↓
Product 2
      ↓
Product 3
      ↓
Product 4
      ↓
End of brand
```

noktasına geldiğinde sayfa otomatik olarak tekrar vertical scroll'a dönmeli.

Bu transition çok önemli.

Kullanıcı:

> "Şimdi neden aşağı inmiyor?"

diye düşünmemeli.

Scroll davranışı doğal ve sezgisel olmalı.

---

# 7. MARKA BÖLÜMLERİ

Her markanın kendine ait bir görsel atmosferi olsun.

Örneğin:

## TE Connectivity

Turuncu tonları.

```text
background:
deep orange / warm orange

accent:
lighter orange
```

## Siemens

Yeşil / teal tonları.

Her markanın section'ı kendi renk dünyasına sahip olabilir.

Fakat renkleri doğrudan aşırı doygun kullanma.

Örneğin:

KÖTÜ:

```text
#FF6600
```

ile bütün ekranı parlak turuncu yapmak.

Bunun yerine:

```text
dark warm orange
+
soft orange accents
+
off-white typography
```

gibi premium bir yaklaşım kullan.

Marka renkleri:

* background
* accent
* typography
* borders
* subtle gradients
* decorative elements

için kullanılabilir.

---

# 8. PRODUCT CARD TASARIMI

Ürün kartları klasik e-commerce card gibi görünmemeli.

Her ürün mümkün olduğunca editorial / catalogue style sunulmalı.

Örneğin:

```text
┌──────────────────────────────┐
│                              │
│                              │
│          PRODUCT IMAGE       │
│                              │
│                              │
├──────────────────────────────┤
│ TE CONNECTIVITY              │
│                              │
│ Product Name                 │
│                              │
│ Short technical description  │
│                              │
│ View Product      →          │
└──────────────────────────────┘
```

Ama kartların tamamı birbirinin aynısı olmak zorunda değil.

Bazı ürünlerde:

* büyük image
* küçük metadata
* product number
* category
* short description

gibi bilgiler kullanılabilir.

Ama tasarım karmaşıklaşmamalı.

---

# 9. ÜRÜN GÖRSELLERİ

Ürün görselleri çok önemli.

Placeholder kullanıyorsan bile gerçek ürün kataloğuna uygun şekilde:

* beyaz / nötr arka plan
* kaliteli ürün fotoğrafı
* teknik ürün renderı
* isolated product imagery

kullan.

Görseller mümkün olduğunca büyük ve kaliteli gösterilmeli.

Image container içerisinde:

* subtle zoom
* parallax
* fade
* scale

gibi küçük motion efektleri kullanılabilir.

Ama ürünün kendisi okunabilirliğini kaybetmemeli.

---

# 10. HERO SECTION

Hero çok güçlü olmalı.

Klasik:

```text
Logo
Başlık
Buton
```

şeklinde sıradan bir hero istemiyorum.

Daha deneyimsel bir açılış istiyorum.

Örneğin:

Büyük typography:

```text
ENERGY
INFRASTRUCTURE
```

veya:

```text
POWERING
WHAT'S NEXT.
```

gibi güçlü bir headline.

Arka planda:

* elektrik ekipmanları
* pano
* trafo
* endüstriyel detay
* teknik çizim
* enerji altyapısı

temalı kaliteli bir görsel / composition kullanılabilir.

Hero'da hafif parallax ve entrance animation kullanılabilir.

Scroll indicator bulunabilir:

```text
SCROLL TO EXPLORE
          ↓
```

---

# 11. COMPANY SECTION

Hero'dan sonra şirket hakkında genel bilgi ver.

Örneğin:

```text
ABOUT THE COMPANY

Engineering
Products
Solutions
```

Büyük typography + kısa açıklama kullanılabilir.

Burada şirketin:

* faaliyet alanı
* mühendislik yaklaşımı
* ürün tedariği
* çözüm yaklaşımı
* sektörel deneyimi

anlatılabilir.

Metinler placeholder olabilir.

---

# 12. VISION / MISSION

Vision ve Mission bölümleri klasik iki kutu şeklinde yapılmamalı.

Daha editorial bir deneyim oluştur.

Örneğin:

```text
01

OUR VISION

Building a more connected
and sustainable energy
infrastructure.
```

Sonra scroll ile:

```text
02

OUR MISSION

...
```

gibi devam eden büyük typography kullanılabilir.

Scroll-triggered text reveal animasyonları kullanılabilir.

---

# 13. PRODUCT CATEGORIES

Sonrasında ürün kategorilerini tanıt.

Örneğin:

```text
PRODUCT PORTFOLIO

LOW VOLTAGE
MEDIUM VOLTAGE
ENERGY SOLUTIONS
```

Bunlar büyük typography ile gösterilebilir.

Low Voltage bölümüne girerken görsel bir transition olsun.

Örneğin:

```text
01
LOW VOLTAGE
```

çok büyük şekilde viewport'u doldurabilir.

Sonrasında ürün markalarına geçiş başlasın.

---

# 14. LOW VOLTAGE SECTION

Örneğin:

```text
LOW VOLTAGE

Reliable components
for modern power distribution.
```

Sonra markalar:

```text
TE CONNECTIVITY
SIEMENS
SCHNEIDER ELECTRIC
...
```

şeklinde devam edebilir.

Markaların gerçek listesi daha sonra data üzerinden değiştirilebilir.

---

# 15. BRAND INTRO

Her markanın horizontal product section'ından önce kısa bir brand intro olsun.

Örneğin:

```text
TE CONNECTIVITY

Connectivity solutions
for electrical infrastructure.

01 / 04
```

Ardından horizontal product gallery başlasın.

Brand intro ile product gallery arasında yumuşak transition olsun.

---

# 16. BRAND SECTION BACKGROUND TRANSITION

Markalar arasında geçiş yaparken background rengi de değişsin.

Örneğin:

```text
TE CONNECTIVITY
       ↓
orange environment
       ↓
horizontal products
       ↓
transition
       ↓
SIEMENS
       ↓
green environment
       ↓
horizontal products
```

Background transition:

* smooth
* cinematic
* subtle

olmalı.

Ani renk değişimi yapılmamalı.

---

# 17. SIDE NAVIGATION / QUICK ACCESS

Sayfanın kenarında şık bir vertical navigation bulunmasını istiyorum.

Bu navigation sürekli görünür olabilir ancak rahatsız edici olmamalı.

Örneğin sağ tarafta:

```text
01  HOME
02  COMPANY
03  PRODUCTS
04  LOW VOLTAGE
05  MEDIUM VOLTAGE
06  CONTACT
```

veya daha minimalist:

```text
01
02
03
04
05
06
```

gibi.

Mouse üzerine geldiğinde bölüm adı ortaya çıkabilir.

Örneğin:

```text
04
────────────
LOW VOLTAGE
```

Bir navigation item'a tıklandığında ilgili section'a:

**smooth scroll**

yapılmalı.

Aktif section görsel olarak belli olmalı.

Ancak klasik navbar gibi görünmemeli.

Daha çok premium interactive navigation hissi vermeli.

---

# 18. CUSTOM CURSOR

Desktop deneyiminde custom cursor oluştur.

Normal mouse cursor yerine:

* küçük circle
* smooth follower
* hover durumunda büyüyen cursor

kullanılabilir.

Örneğin normal:

```text
   ○
```

Hover:

```text
      ◯
   VIEW
```

gibi.

Interactive element üzerinde cursor değişebilir.

Örneğin:

Product:

```text
VIEW
```

Horizontal gallery:

```text
DRAG →
```

Link:

```text
OPEN
```

gibi.

Cursor çok büyük veya rahatsız edici olmamalı.

Smooth interpolation kullanılmalı.

Örneğin mouse hareketini doğrudan cursor'a bağlamak yerine interpolation / lerp kullan.

---

# 19. SCROLL-BASED ANIMATIONS

Sayfanın çeşitli noktalarında scroll-driven animations kullan.

Örneğin:

### Text reveal

```text
Engineering
```

kelimesi scroll ile yukarıdan ortaya gelebilir.

### Image reveal

Image:

```text
scale(1.1)
→
scale(1)
```

### Parallax

Background image:

```text
translateY(...)
```

### Typography

Büyük başlıklar scroll sırasında hafif hareket edebilir.

### Product cards

Horizontal scroll sırasında:

```text
opacity
scale
translateY
```

kombinasyonları kullanılabilir.

Fakat:

**Her şeye animasyon koyma.**

Animasyonlar tasarımı desteklemeli.

---

# 20. SCROLL PROGRESS

İstersen sayfanın kenarında çok minimal bir scroll progress indicator kullan.

Örneğin:

```text
│
│
●
│
│
```

veya ince bir çizgi.

Kullanıcı sayfanın neresinde olduğunu anlayabilsin.

Bu, side navigation ile entegre de edilebilir.

---

# 21. MOBILE EXPERIENCE

Mobile'da kesinlikle desktop tasarımını küçültüp bırakma.

Mobile viewport:

```text
375px
390px
414px
```

gibi genişliklerde kusursuz çalışmalı.

Mobile'da:

* custom cursor kapatılmalı
* side navigation daha minimal hale getirilmeli
* typography responsive olmalı
* images responsive olmalı
* horizontal sections kullanıcıyı kilitlememeli
* touch gesture desteklenmeli

Önemli:

Desktop'taki horizontal scroll deneyimi mobile'da da mümkün olduğunca korunmalı.

Fakat kullanıcı deneyimi kötüleşiyorsa mobile'da:

**native horizontal swipe**

kullanılabilir.

Örneğin:

```text
← swipe →
```

ürünleri inceleyebilmeli.

---

# 22. RESPONSIVE TYPOGRAPHY

Hardcoded büyük font size kullanma.

CSS `clamp()` kullan.

Örneğin:

```css
font-size: clamp(3rem, 8vw, 9rem);
```

Başlıklar desktop'ta etkileyici büyüklükte olmalı.

Mobile'da ise ekranı tamamen kullanılabilir bırakmalı.

---

# 23. PERFORMANCE

Bu katalog yüksek kaliteli görseller içereceği için performance önemli.

Şunlara dikkat et:

* lazy loading
* responsive images
* appropriate image sizes
* `loading="lazy"`
* `decoding="async"`
* mümkünse WebP / AVIF
* gereksiz rerender önleme
* animation sırasında layout thrashing yapmama

Scroll eventlerini optimize et.

Mümkün olduğunca:

```text
transform
opacity
scale
```

gibi GPU-friendly property'leri kullan.

Her scroll eventinde React state güncellemekten kaçın.

---

# 24. ACCESSIBILITY

Premium tasarım yapılırken accessibility unutulmasın.

* semantic HTML
* proper heading hierarchy
* keyboard navigation
* focus states
* alt text
* sufficient contrast
* reduced motion support

ekle.

Özellikle:

```css
@media (prefers-reduced-motion: reduce)
```

durumunda animasyonları azalt.

---

# 25. COMPONENT ARCHITECTURE

Mantıklı component yapısı oluştur.

Örneğin:

```text
src/
  components/
    layout/
      Header
      SideNavigation
      Footer

    hero/
      HeroSection

    company/
      CompanySection
      VisionSection
      MissionSection

    products/
      ProductIntro
      CategorySection
      BrandSection
      ProductGallery
      ProductCard

    contact/
      ContactSection

    ui/
      CustomCursor
      ScrollProgress
      SectionIndicator

  data/
    brands.ts
    products.ts
    categories.ts

  hooks/
    useScrollProgress.ts
    useHorizontalScroll.ts
    useMousePosition.ts

  styles/
    ...
```

Birebir bu yapıyı kullanmak zorunda değilsin; daha iyi bir architecture gerekiyorsa onu tercih et.

Ama componentleri tek bir dev `App.tsx` dosyasına doldurma.

---

# 26. DATA-DRIVEN PRODUCT SYSTEM

Ürünleri component içine hardcode etme.

Örneğin:

```ts
const brands = [
  {
    id: "te-connectivity",
    name: "TE Connectivity",
    category: "low-voltage",
    accentColor: "...",
    backgroundColor: "...",
    description: "...",
    products: [
      {
        id: "product-1",
        name: "...",
        description: "...",
        image: "..."
      }
    ]
  }
];
```

Daha sonra yeni marka eklemek mümkün olmalı:

```ts
{
  name: "Schneider Electric",
  ...
}
```

ve otomatik olarak aynı BrandSection component'i kullanılabilmeli.

---

# 27. CONTACT SECTION

Sayfanın sonunda güçlü bir contact section oluştur.

Klasik:

```text
Contact Us

Name
Email
Message
Submit
```

formu gibi görünmek zorunda değil.

Daha premium bir closing section olabilir:

```text
LET'S BUILD
WHAT'S NEXT.

Green Pi Enerji

Email
Phone
Address
```

ve contact details.

Sayfanın başındaki görsel dil ile uyumlu bir final oluştur.

---

# 28. FOOTER

Minimal footer:

* company name
* copyright
* contact
* social links
* privacy / legal

gibi bilgiler içerebilir.

Footer sade olmalı.

---

# 29. VISUAL DETAILS

Tasarımın premium görünmesi için küçük detaylar kullan:

* fine borders
* tiny labels
* uppercase metadata
* letter spacing
* subtle noise texture
* subtle grain
* thin lines
* section numbers
* micro-interactions
* editorial typography
* asymmetrical layouts
* oversized typography

Örneğin:

```text
01 / 06

LOW VOLTAGE
```

gibi küçük metadata elementleri kullan.

---

# 30. GRID SYSTEM

Sayfa boyunca tutarlı bir grid sistemi kullan.

Desktop'ta örneğin:

```text
12-column grid
```

kullanılabilir.

Bazı içerikler grid'e tam otururken bazı büyük typography elementleri grid dışına taşabilir.

Tasarımın fazla simetrik ve template gibi görünmesini engelle.

---

# 31. INTERACTION PHILOSOPHY

Kullanıcı siteyi gezerken:

> "Bu bir katalog ama normal PDF katalog değil."

hissini almalı.

Siteyi keşfetmek keyifli olmalı.

Örneğin:

* cursor interactions
* hover animations
* horizontal product journeys
* background transitions
* scroll-triggered typography
* image parallax
* section transitions

birlikte kullanılmalı.

Ancak hiçbir interaction kullanıcıyı yormamalı.

---

# 32. ÖNEMLİ — KULLANICI DENEYİMİ

Şunları kesinlikle yapma:

* Scroll'u tamamen kontrol edip kullanıcıyı zorla hareket ettirme.
* Horizontal section içinde kullanıcıyı sonsuza kadar kilitleme.
* Çok fazla animation kullanma.
* Page load'da uzun intro animation gösterip kullanıcıyı bekletme.
* Mobilde desktop interaction'larını zorla kullanma.
* Kullanıcı scroll ederken içerik kaybolmasına neden olma.

Temel prensip:

**"The interface should feel magical, not confusing."**

---

# 33. İLK VERSİYON

İlk versiyonda aşağıdaki gerçekçi demo yapısını oluştur:

### HERO

Green Pi Enerji

"Powering the infrastructure behind tomorrow."

---

### COMPANY

Şirket hakkında kısa açıklama.

---

### VISION

Şirket vizyonu.

---

### MISSION

Şirket misyonu.

---

### PRODUCT PORTFOLIO

```text
LOW VOLTAGE
MEDIUM VOLTAGE
ENERGY SOLUTIONS
```

---

### LOW VOLTAGE

#### TE CONNECTIVITY

4-6 adet örnek ürün.

Her üründe:

* ürün adı
* kısa açıklama
* ürün görseli

Horizontal scroll.

---

#### SIEMENS

4-6 adet örnek ürün.

Horizontal scroll.

Farklı background atmosphere.

---

#### SCHNEIDER ELECTRIC

4-6 adet örnek ürün.

Horizontal scroll.

---

### MEDIUM VOLTAGE

Yeni bir büyük section transition.

Ardından örnek markalar ve ürünler.

---

### CONTACT

Güçlü closing statement + iletişim bilgileri.

---

# 34. SONUÇTA BEKLEDİĞİM DENEYİM

Kullanıcı sayfaya girdiğinde:

```text
HERO
 ↓
Company
 ↓
Vision
 ↓
Mission
 ↓
Product Portfolio
 ↓
LOW VOLTAGE
 ↓
TE CONNECTIVITY
 → Product
 → Product
 → Product
 → Product
 ↓
SIEMENS
 → Product
 → Product
 → Product
 ↓
SCHNEIDER
 → Product
 → Product
 → Product
 ↓
MEDIUM VOLTAGE
 ↓
...
 ↓
CONTACT
```

akışını yaşamalı.

Ama bunu bir slideshow gibi değil, **gerçek bir scroll journey** gibi hissettirmeli.

---

# 35. TASARIMI GELİŞTİRMEKTE ÖZGÜR OL

Yukarıdaki gereksinimler temel beklentilerimdir.

Bunları birebir mekanik şekilde uygulamak zorunda değilsin.

Eğer daha iyi bir:

* layout
* scroll interaction
* transition
* animation
* typography
* navigation
* product presentation

fikrin varsa uygulayabilirsin.

Ancak ana hedeflerden sapma:

**premium + industrial + technical + immersive + interactive catalogue**

---

# 36. GELİŞTİRME SIRASI

Projeyi şu sırayla geliştir:

1. Önce genel page architecture oluştur.
2. Ardından global typography ve design system oluştur.
3. Hero oluştur.
4. Company / Vision / Mission bölümlerini oluştur.
5. Product category transition oluştur.
6. BrandSection componentini oluştur.
7. Horizontal product scroll sistemini oluştur.
8. Brand transitionlarını oluştur.
9. Side navigation oluştur.
10. Custom cursor oluştur.
11. Scroll animations ekle.
12. Medium Voltage bölümü oluştur.
13. Contact / Footer oluştur.
14. Responsive/mobile düzenlemelerini yap.
15. Accessibility kontrollerini yap.
16. Performance optimizasyonlarını yap.

---

# 37. ÇOK ÖNEMLİ

İlk olarak bana uzun açıklamalar yazmak yerine projeyi analiz et ve mevcut repository yapısını incele.

Mevcut projede kullanılan:

* package.json
* styling sistemi
* component yapısı
* asset yapısı
* mevcut sayfalar

varsa bunları bozma.

Mevcut yapıyla uyumlu şekilde geliştir.

Eğer proje boşsa yukarıdaki architecture'ı oluştur.

Kod yazarken production-quality yaklaşım kullan.

Sonuç **çalışan, responsive ve görsel olarak gerçekten premium bir web deneyimi** olmalı.

Öncelik sırası:

1. User experience
2. Visual quality
3. Scroll interaction
4. Responsive design
5. Performance
6. Clean architecture
7. Accessibility
