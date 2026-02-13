# 📱 LUXURY LIFE - DOCUMENTACIÓN COMPLETA

> **Versión:** 2.0.0  
> **Tipo:** Aplicación benéfica de entretenimiento (experiencia de lujo extremo)  
> **Stack:** React + Vite + Tailwind CSS + TypeScript + Capacitor + Supabase  
> **URL Publicada:** https://animate-joyful-launch.lovable.app  
> **Repositorio:** https://github.com/ferranmysticgarden/animate-joyful-launch.git

---

## ⚠️ ACTUALIZACIÓN v2.0 - 9 NIVELES DE LUJO EXTREMO

### NUEVOS PRODUCTOS ÉLITE (Tier Superior):
| Nivel | Producto | Precio | Stripe Price ID | Descripción |
|-------|----------|--------|-----------------|-------------|
| 7 | Private Paradise Island | €5,000 | `price_1Su9iLB6GI8NmIPnewKubmDH` | "Un lugar que no existe en los mapas. Solo para ti." |
| 8 | Orbital Space Station | €10,000 | `price_1Su9isB6GI8NmIPncg7ElWnp` | "El lujo definitivo ya no está en la Tierra." |
| 9 | Own a Planet | €50,000 | `price_1Su9jLB6GI8NmIPnjMLJS8fQ` | "No posees cosas. Posees mundos." |

### TOTAL MÁXIMO: €67,500 (todos los niveles)

---

## 📋 ÍNDICE

1. [Concepto de la App](#concepto-de-la-app)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Rutas y Navegación](#rutas-y-navegación)
4. [Sistema de Pagos](#sistema-de-pagos)
5. [Productos y Precios COMPLETOS](#productos-y-precios-completos)
6. [Base de Datos](#base-de-datos)
7. [Diseño y Estética](#diseño-y-estética)
8. [Componentes Principales](#componentes-principales)
9. [Animaciones](#animaciones)
10. [Assets](#assets)
11. [Configuración Android](#configuración-android)
12. [Build y Deployment](#build-y-deployment)
13. [Legal y Caridad](#legal-y-caridad)
14. [Variables de Entorno](#variables-de-entorno)

---

## 🎮 CONCEPTO DE LA APP

**Luxury Life** es una app de entretenimiento donde los usuarios adquieren **productos de lujo simbólicos** de forma progresiva. La app es **legalmente benéfica** (70% a UNICEF), pero la experiencia visual se centra en el **lujo extremo y aspiracional** (estilo Rolex, Bugatti, Dubai).

### Filosofía:
- **Para el usuario:** Experiencia de adquisición de lujo extremo
- **Legalmente:** Proyecto benéfico con 70% a UNICEF
- **Efecto psicológico:** Escalera de precios (100€ → 50,000€) que normaliza las compras

### Flujo Principal:
```
HOME (PLAY) → GARAGE → Niveles 1-6 → ELITE TIER (7-9) → Payment Success → OWNED
```

### Desbloqueo de niveles:
- Niveles 1-5: Siempre visibles
- Nivel 6 (Luxury Island): Se desbloquea al comprar Nivel 5
- Niveles 7-9 (ELITE TIER): Se desbloquean al comprar Nivel 6

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
├── src/
│   ├── App.tsx                          # Router principal
│   ├── main.tsx                         # Entry point
│   ├── index.css                        # Design system (colores, gradientes)
│   │
│   ├── pages/
│   │   ├── Index.tsx                    # Pantalla inicial "Luxury Life"
│   │   ├── Garage.tsx                   # Lista de 9 niveles con BUY
│   │   ├── VehicleDisplay.tsx           # Pantalla de visualización
│   │   ├── PaymentSuccess.tsx           # Confirmación de pago
│   │   ├── Privacy.tsx                  # Política de privacidad
│   │   ├── Terms.tsx                    # Términos de servicio
│   │   └── NotFound.tsx                 # Página 404
│   │
│   ├── components/
│   │   ├── VehicleCard.tsx              # Tarjeta de vehículo normal
│   │   ├── EliteVehicleCard.tsx         # Tarjeta ELITE con efectos especiales
│   │   ├── PurchaseModal.tsx            # Modal con frase "Tu estatus no se explica..."
│   │   ├── GarageButton.tsx             # Botón rojo "PLAY"
│   │   ├── FloatingDollar.tsx           # $ flotante
│   │   ├── DollarSymbol.tsx             # $ central
│   │   ├── Confetti.tsx                 # Lluvia de confeti
│   │   ├── ParticleBackground.tsx       # Partículas brillantes
│   │   └── ui/                          # Componentes shadcn/ui
│   │
│   ├── hooks/
│   │   ├── usePurchases.ts              # Gestión de 9 niveles en localStorage
│   │   └── use-toast.ts                 # Notificaciones
│   │
│   ├── assets/
│   │   ├── level1-sports-car.png        # Nivel 1
│   │   ├── level2-yacht.jpeg            # Nivel 2
│   │   ├── level3-helicopter.webp       # Nivel 3
│   │   ├── level4-jet.webp              # Nivel 4
│   │   ├── level5-mansion.png           # Nivel 5
│   │   ├── luxury-island.webp           # Nivel 6
│   │   ├── level7-paradise-island.jpg   # Nivel 7 ELITE
│   │   ├── level8-space-station.jpg     # Nivel 8 ELITE
│   │   ├── level9-planet.jpg            # Nivel 9 ELITE
│   │   └── purchase-applause.mp3        # Audio celebración
│   │
│   └── integrations/supabase/
│       ├── client.ts                    # Cliente Supabase (AUTO)
│       └── types.ts                     # Tipos de BD (AUTO)
│
├── supabase/
│   └── functions/
│       └── create-payment/
│           └── index.ts                 # Edge function con 9 Price IDs
│
├── capacitor.config.ts                  # Configuración Android
├── android-build.bat                    # Script build Windows
└── android-build.sh                     # Script build Mac/Linux
```

---

## 💰 PRODUCTOS Y PRECIOS COMPLETOS

### Tier Normal (Niveles 1-6):
| Nivel | Producto | Precio | Stripe Price ID |
|-------|----------|--------|-----------------|
| 1 | Sports Car | €100 | `price_1So8TnB6GI8NmIPnJasBJsMH` |
| 2 | Yacht | €200 | `price_1So8U7B6GI8NmIPn2gmK5gxh` |
| 3 | Helicopter | €300 | `price_1So8UHB6GI8NmIPnbppQ0OGJ` |
| 4 | Private Jet | €400 | `price_1So8URB6GI8NmIPnJuZ6J291` |
| 5 | Mansion | €500 | `price_1So8UeB6GI8NmIPnF8Y3K90q` |
| 6 | Luxury Island | €1,000 | `price_1So8PLB6GI8NmIPnka0jI0wz` |

### ⚜️ ELITE TIER (Niveles 7-9):
| Nivel | Producto | Precio | Stripe Price ID | Descripción |
|-------|----------|--------|-----------------|-------------|
| 7 | Private Paradise Island | €5,000 | `price_1Su9iLB6GI8NmIPnewKubmDH` | "Un lugar que no existe en los mapas." |
| 8 | Orbital Space Station | €10,000 | `price_1Su9isB6GI8NmIPncg7ElWnp` | "El lujo definitivo ya no está en la Tierra." |
| 9 | Own a Planet | €50,000 | `price_1Su9jLB6GI8NmIPnjMLJS8fQ` | "No posees cosas. Posees mundos." |

### TOTALES:
- **Tier Normal (1-6):** €2,500
- **Elite Tier (7-9):** €65,000
- **TOTAL MÁXIMO:** €67,500

### Mapeo en Edge Function:
```typescript
// supabase/functions/create-payment/index.ts
const PRICE_IDS: Record<number, string> = {
  1: "price_1So8TnB6GI8NmIPnJasBJsMH",  // Sports Car - €100
  2: "price_1So8U7B6GI8NmIPn2gmK5gxh",  // Yacht - €200
  3: "price_1So8UHB6GI8NmIPnbppQ0OGJ",  // Helicopter - €300
  4: "price_1So8URB6GI8NmIPnJuZ6J291",  // Private Jet - €400
  5: "price_1So8UeB6GI8NmIPnF8Y3K90q",  // Mansion - €500
  6: "price_1So8PLB6GI8NmIPnka0jI0wz",  // Luxury Island - €1000
  7: "price_1Su9iLB6GI8NmIPnewKubmDH",  // Private Paradise Island - €5000
  8: "price_1Su9isB6GI8NmIPncg7ElWnp",  // Orbital Space Station - €10000
  9: "price_1Su9jLB6GI8NmIPnjMLJS8fQ",  // Own a Planet - €50000
};
```

---

## 🎨 DISEÑO Y ESTÉTICA

### Filosofía Visual:
- **Negro, dorado, oscuro, brillante**
- **Estilo:** Rolex, Bugatti, Dubai, ultra-lujo
- **Tipografía fuerte y animaciones suaves**
- **Elite Tier:** Glow dorado exagerado, separación visual clara

### Paleta de Colores (HSL):
```css
:root {
  --background: 0 0% 5%;              /* Negro profundo */
  --foreground: 45 100% 55%;          /* Dorado brillante */
  --primary: 45 100% 55%;             /* Dorado (#FFD700) */
  --secondary: 280 100% 70%;          /* Púrpura */
  --accent: 340 100% 65%;             /* Rosa/Rojo */
  --level: 210 100% 60%;              /* Azul (diamantes) */
}
```

### Gradientes:
```css
--gradient-gold: linear-gradient(135deg, hsl(45 100% 50%), hsl(30 100% 50%), hsl(0 70% 65%));
--gradient-elite: linear-gradient(135deg, hsl(45 100% 50%), hsl(30 100% 50%), hsl(0 70% 65%));
```

### Sombras:
```css
--shadow-gold: 0 0 80px hsl(45 100% 55% / 0.8), 0 0 40px hsl(45 100% 55% / 0.6);
--shadow-elite: 0 0 60px hsl(45 100% 55% / 0.6), 0 0 120px hsl(45 100% 55% / 0.3);
```

### Fuentes:
- **Título:** `'Pinyon Script', cursive`
- **Garage:** `'Brush Script MT', cursive`
- **Vehículos/Botones:** `'Orbitron', sans-serif`

---

## 🧩 COMPONENTES PRINCIPALES

### 1. VehicleCard.tsx (Niveles 1-6)
Tarjeta estándar con imagen, nombre, diamantes de nivel, botón BUY/OWNED.

### 2. EliteVehicleCard.tsx (Niveles 7-9) ⚜️
Tarjeta especial con:
- Borde dorado brillante
- Animación shimmer
- Badge "ELITE" con corona
- Sparkles animados
- Descripción en cursiva
- Precio grande y destacado
- Glow intenso dorado

### 3. PurchaseModal.tsx
Modal de compra con:
- Frase: **"Tu estatus no se explica. Se demuestra."**
- Campo de email
- Botones Pay Now / Cancel
- Sin menciones a caridad (solo texto legal al final del Garage)

---

## 📦 ASSETS

### Imágenes de vehículos:
| Asset | Nivel | Formato |
|-------|-------|---------|
| `level1-sports-car.png` | 1 | PNG |
| `level2-yacht.jpeg` | 2 | JPEG |
| `level3-helicopter.webp` | 3 | WebP |
| `level4-jet.webp` | 4 | WebP |
| `level5-mansion.png` | 5 | PNG |
| `luxury-island.webp` | 6 | WebP |
| `level7-paradise-island.jpg` | 7 | JPEG |
| `level8-space-station.jpg` | 8 | JPEG |
| `level9-planet.jpg` | 9 | JPEG |

---

## 🚀 BUILD Y DEPLOYMENT

### Variables de entorno:
```bash
set KEYSTORE_PATH=release-key.jks
set KEYSTORE_ALIAS=luxury-life
set KEYSTORE_PASSWORD=<YOUR_KEYSTORE_PASSWORD>
set KEYSTORE_ALIAS_PASSWORD=<YOUR_KEYSTORE_ALIAS_PASSWORD>
```
> ⚠️ **NUNCA** hardcodees las contraseñas del keystore. Usa variables de entorno seguras.

### Comandos:
```bash
git clone https://github.com/ferranmysticgarden/animate-joyful-launch.git
cd animate-joyful-launch
npm install
npx cap add android  # Primera vez
android-build.bat    # Windows
```

### Ubicación AAB:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## ⚖️ LEGAL Y CARIDAD

### Configuración:
- **Porcentaje donación:** 70% de ingresos netos
- **Beneficiario:** UNICEF
- **Enlaces:** https://www.unicef.org/donate

### Visibilidad en UI:
- **Mínima** - Solo un texto pequeño al final del Garage:
  > "Luxury Life es un proyecto benéfico legal. Las compras representan productos de lujo simbólicos que contribuyen a causas reales."

### Políticas (completas en /privacy y /terms):
- Solo email para pagos
- 70% donado a UNICEF
- Items virtuales sin valor real

---

## 📊 EFECTO PSICOLÓGICO DE PRECIOS

La escalera de precios:
```
€100 → €200 → €300 → €400 → €500 → €1,000
                                      ↓
                        €5,000 → €10,000 → €50,000
```

**Objetivo:** Cuando el usuario ve €50,000, piensa que €1,000 "no es tan caro".

---

## 🏁 RESUMEN

Esta app es:
- ✅ **Legalmente benéfica**
- ✅ **Psicológicamente una experiencia de lujo extremo**
- ✅ **Un experimento social de estatus y poder**
- ✅ **Provocadora, aspiracional, casi incómoda**
- ✅ **No racional. Emocional.**

**No es una app de donaciones. Es una app de productos de lujo simbólicos con impacto real.**
