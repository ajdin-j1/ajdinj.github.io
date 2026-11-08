# ajdin.j – lični portfolio

Statična web stranica: HTML, CSS i JavaScript, bez biblioteka i bez instalacije.

## Struktura
```
portfolio/
├── index.html   ← sav sadržaj (tekstovi, usluge, projekti, kontakt)
├── style.css    ← izgled (boje i fontovi su na vrhu, u :root)
├── script.js    ← meni, animacije, brojači, kontakt forma
└── img/         ← ovdje stavljaš screenshotove projekata
```

## Pokretanje u VS Code
1. File → Open Folder → izaberi folder `portfolio`.
2. Instaliraj ekstenziju **Live Server** (autor Ritwick Dey).
3. Desni klik na `index.html` → **Open with Live Server**.
4. Svaka izmjena se odmah vidi u browseru kad sačuvaš fajl (Ctrl+S).

## Šta najčešće mijenjaš
| Šta | Gdje |
|---|---|
| Cijene usluga | `index.html` → traži `card__price` |
| Glavna boja | `style.css` → `--accent` |
| WhatsApp broj | `index.html` → `data-phone` (bez + i razmaka) |
| Email za formu | `index.html` → `data-email` |
| Novi projekat | kopiraj jedan `<article class="work">` blok |
| Boje sličice projekta | `style.css` → `.thumb--cafe`, `.thumb--auto` … |

## Dodavanje slike projekta
Kad napraviš pravu stranicu za klijenta, stavi screenshot u `img/` (npr. `kafic.jpg`, odnos 4:3)
i u tom projektu zamijeni cijeli `<div class="thumb ...">…</div>` sa:
```html
<img class="work__img" src="img/kafic.jpg" alt="Web stranica za kafić">
```

## Objavljivanje na internetu (besplatno)
- **Netlify Drop**: app.netlify.com/drop, pa samo prevučeš folder `portfolio`. Za minutu dobiješ link.
- Ili **GitHub Pages**, ako želiš imati i GitHub profil (dobro za portfolio).
- Kasnije možeš kupiti domenu, npr. `ajdin.ba` ili `ajdinj.com`, i spojiti je.
