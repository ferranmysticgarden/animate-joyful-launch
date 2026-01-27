# 📱 LUXURY LIFE - DOCUMENTACIÓN COMPLETA

> **Versión:** 1.0.0  
> **Tipo:** Aplicación benéfica de entretenimiento  
> **Stack:** React + Vite + Tailwind CSS + TypeScript + Capacitor + Supabase  
> **URL Publicada:** https://animate-joyful-launch.lovable.app  
> **Repositorio:** https://github.com/ferranmysticgarden/animate-joyful-launch.git

---

## 📋 ÍNDICE

1. [Concepto de la App](#concepto-de-la-app)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Rutas y Navegación](#rutas-y-navegación)
4. [Sistema de Pagos](#sistema-de-pagos)
5. [Productos y Precios](#productos-y-precios)
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

**Luxury Life** es una app de entretenimiento benéfico donde los usuarios "compran" artículos de lujo virtuales (coches, yates, helicópteros, jets, mansiones, islas). El **70% de los ingresos** se dona a **UNICEF**.

### Flujo Principal:
```
HOME (PLAY) → GARAGE → Seleccionar item → Email → Stripe Checkout → Payment Success → OWNED
                                                                           ↓
                                    (Nivel 5 completado) → BONUS SCREEN → Isla €1000
```

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
│   │   ├── Garage.tsx                   # Lista de niveles con botón BUY
│   │   ├── VehicleDisplay.tsx           # Pantalla de visualización del vehículo
│   │   ├── BonusScreen.tsx              # Nivel bonus (Luxury Island)
│   │   ├── PaymentSuccess.tsx           # Confirmación de pago exitoso
│   │   ├── Privacy.tsx                  # Política de privacidad
│   │   ├── Terms.tsx                    # Términos de servicio
│   │   ├── Auth.tsx                     # Autenticación (opcional)
│   │   └── NotFound.tsx                 # Página 404
│   │
│   ├── components/
│   │   ├── VehicleCard.tsx              # Tarjeta de vehículo con BUY/OWNED
│   │   ├── PurchaseModal.tsx            # Modal de compra con email
│   │   ├── GarageButton.tsx             # Botón rojo circular "PLAY"
│   │   ├── FloatingDollar.tsx           # Símbolo $ flotante (fondo)
│   │   ├── DollarSymbol.tsx             # Símbolo $ grande central
│   │   ├── Confetti.tsx                 # Lluvia de confeti
│   │   ├── ParticleBackground.tsx       # Partículas brillantes de fondo
│   │   ├── GarageModal.tsx              # Modal del garage
│   │   ├── LanguageSwitch.tsx           # Selector de idioma
│   │   └── ui/                          # Componentes shadcn/ui
│   │
│   ├── hooks/
│   │   ├── usePurchases.ts              # Gestión de compras en localStorage
│   │   ├── use-mobile.tsx               # Detección de móvil
│   │   └── use-toast.ts                 # Sistema de notificaciones
│   │
│   ├── assets/
│   │   ├── level1-sports-car.png        # Imagen nivel 1
│   │   ├── level2-yacht.jpeg            # Imagen nivel 2
│   │   ├── level3-helicopter.webp       # Imagen nivel 3
│   │   ├── level4-jet.webp              # Imagen nivel 4
│   │   ├── level5-mansion.png           # Imagen nivel 5
│   │   ├── luxury-island.webp           # Imagen nivel 6 (bonus)
│   │   ├── purchase-applause.mp3        # Audio de celebración
│   │   ├── dollar-gold.png              # Símbolo $ dorado
│   │   ├── dollar-3d.png                # Símbolo $ 3D
│   │   └── car-level[1-5].png           # Variantes de coches
│   │
│   ├── lib/
│   │   ├── utils.ts                     # Utilidades (cn, clsx)
│   │   ├── i18n.ts                      # Internacionalización
│   │   └── translations.ts              # Traducciones
│   │
│   └── integrations/supabase/
│       ├── client.ts                    # Cliente Supabase (AUTO-GENERADO)
│       └── types.ts                     # Tipos de BD (AUTO-GENERADO)
│
├── supabase/
│   ├── config.toml                      # Configuración Supabase
│   └── functions/
│       └── create-payment/
│           └── index.ts                 # Edge function para Stripe
│
├── android/                             # Generado por Capacitor
├── scripts/android/
│   └── prepare-android-release.mjs      # Script de firmado automático
│
├── capacitor.config.ts                  # Configuración Capacitor
├── android-build.bat                    # Script build Windows
├── android-build.sh                     # Script build Mac/Linux
├── vite.config.ts                       # Configuración Vite
├── tailwind.config.ts                   # Configuración Tailwind
├── index.html                           # HTML principal
└── package.json                         # Dependencias
```

---

## 🛤️ RUTAS Y NAVEGACIÓN

```typescript
// src/App.tsx
<Routes>
  <Route path="/" element={<Index />} />              // Pantalla inicial
  <Route path="/auth" element={<Auth />} />           // Login (opcional)
  <Route path="/garage" element={<Garage />} />       // Lista de niveles
  <Route path="/vehicle/:id" element={<VehicleRoute />} />  // Ver vehículo comprado
  <Route path="/bonus" element={<BonusScreen />} />   // Pantalla bonus
  <Route path="/vehicle/bonus" element={<Navigate to="/vehicle/6" replace />} />
  <Route path="/payment-success" element={<PaymentSuccess />} />  // Pago exitoso
  <Route path="/privacy" element={<Privacy />} />     // Política privacidad
  <Route path="/terms" element={<Terms />} />         // Términos
  <Route path="*" element={<NotFound />} />           // 404
</Routes>
```

---

## 💳 SISTEMA DE PAGOS

### Proveedor: **Stripe**
### Tipo: **One-time payments** (pagos únicos, NO suscripciones)

### Edge Function: `supabase/functions/create-payment/index.ts`

```typescript
// Flujo:
// 1. Usuario hace clic en BUY
// 2. Modal pide email
// 3. Frontend llama a create-payment con { level, email }
// 4. Edge function crea sesión Stripe Checkout
// 5. Usuario paga en Stripe
// 6. Redirect a /payment-success?level=X
// 7. localStorage guarda compra
```

### Configuración Stripe:
- **API Version:** `2025-08-27.basil`
- **Secret Key:** Configurada en secrets de Supabase Cloud
- **Mode:** `payment` (no subscription)

### URLs de Callback:
- **Success:** `${origin}/payment-success?level=${level}`
- **Cancel:** `${origin}/garage`

---

## 💰 PRODUCTOS Y PRECIOS

| Nivel | Producto | Precio | Stripe Price ID |
|-------|----------|--------|-----------------|
| 1 | Sports Car | €100 | `price_1So8TnB6GI8NmIPnJasBJsMH` |
| 2 | Yacht | €200 | `price_1So8U7B6GI8NmIPn2gmK5gxh` |
| 3 | Helicopter | €300 | `price_1So8UHB6GI8NmIPnbppQ0OGJ` |
| 4 | Private Jet | €400 | `price_1So8URB6GI8NmIPnJuZ6J291` |
| 5 | Mansion | €500 | `price_1So8UeB6GI8NmIPnF8Y3K90q` |
| 6 | Luxury Island | €1000 | `price_1So8PLB6GI8NmIPnka0jI0wz` |

**TOTAL:** €2,500

### Mapeo en código:
```typescript
// supabase/functions/create-payment/index.ts
const PRICE_IDS: Record<number, string> = {
  1: "price_1So8TnB6GI8NmIPnJasBJsMH",
  2: "price_1So8U7B6GI8NmIPn2gmK5gxh",
  3: "price_1So8UHB6GI8NmIPnbppQ0OGJ",
  4: "price_1So8URB6GI8NmIPnJuZ6J291",
  5: "price_1So8UeB6GI8NmIPnF8Y3K90q",
  6: "price_1So8PLB6GI8NmIPnka0jI0wz",
};
```

---

## 🗄️ BASE DE DATOS

### Supabase Project ID: `wdcmoqtfcgcjxugezuvw`

### Tabla: `purchases`
```sql
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  level INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'pending',
  stripe_payment_intent_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Políticas RLS:
- **SELECT:** Denegado a todos excepto service_role
- **INSERT:** Solo service_role (desde Edge Functions)
- Los clientes NO tienen acceso directo a esta tabla

---

## 🎨 DISEÑO Y ESTÉTICA

### Paleta de Colores (HSL):

```css
/* src/index.css */
:root {
  --background: 0 0% 5%;              /* Negro profundo */
  --foreground: 45 100% 55%;          /* Dorado brillante */
  
  --card: 0 0% 10%;                   /* Gris oscuro */
  --card-foreground: 45 100% 55%;     /* Dorado */
  
  --primary: 45 100% 55%;             /* Dorado (#FFD700) */
  --primary-foreground: 0 0% 10%;     /* Negro */
  
  --secondary: 280 100% 70%;          /* Púrpura */
  --accent: 340 100% 65%;             /* Rosa/Rojo */
  
  --level: 210 100% 60%;              /* Azul (diamantes de nivel) */
  
  --muted: 0 0% 20%;                  /* Gris muted */
  --muted-foreground: 45 60% 75%;     /* Dorado suave */
  
  --border: 45 50% 40%;               /* Borde dorado */
}
```

### Gradientes:
```css
--gradient-gold: linear-gradient(135deg, #FFD700, #FFA500, #FF6B6B);
--gradient-silver: linear-gradient(135deg, #E8E8E8, #C0C0C0, #A8A8A8, #C0C0C0, #E8E8E8);
--gradient-party: linear-gradient(135deg, #FFD700, #FF6B6B, #A855F7, #06B6D4);
--gradient-radial: radial-gradient(circle at 50% 50%, hsl(45 100% 55% / 0.3), hsl(340 100% 65% / 0.2), transparent);
--gradient-dark: linear-gradient(180deg, hsl(0 0% 5%), hsl(280 50% 10%));
```

### Sombras:
```css
--shadow-gold: 0 0 80px hsl(45 100% 55% / 0.8), 0 0 40px hsl(45 100% 55% / 0.6);
--shadow-glow: 0 0 120px hsl(45 100% 55% / 0.9), 0 0 60px hsl(340 100% 65% / 0.6);
--shadow-mega: 0 0 150px hsl(45 100% 55% / 1), 0 0 100px hsl(340 100% 65% / 0.8);
```

### Fuentes:
- **Título principal:** `'Pinyon Script', cursive` (caligrafía elegante)
- **Título Garage:** `'Brush Script MT', 'Segoe Script', cursive`
- **Nombres vehículos:** `'Orbitron', sans-serif` (futurista)
- **Botones:** `'Orbitron', sans-serif`

---

## 🧩 COMPONENTES PRINCIPALES

### 1. VehicleCard.tsx
Tarjeta de vehículo con imagen, nombre, nivel (diamantes), y botón BUY/OWNED.
```typescript
interface VehicleCardProps {
  name: string;
  image: string;
  level: number;           // 1-6
  onView?: () => void;     // Navegar a ver vehículo
  onBuy?: () => void;      // Abrir modal de compra
  isPurchased?: boolean;   // Mostrar OWNED
  isNew?: boolean;         // Badge "NUEVO NIVEL"
}
```

### 2. PurchaseModal.tsx
Modal de compra con campo de email y botones Pay Now / Cancel.
```typescript
interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onPurchase: () => void;
  vehicleName: string;
  price: string;
  email: string;
  onEmailChange: (email: string) => void;
  isLoading?: boolean;
}
```

### 3. GarageButton.tsx
Botón rojo circular pulsante "PLAY" en pantalla inicial.

### 4. DollarSymbol.tsx
Símbolo $ gigante central en pantalla inicial con gradiente dorado.

### 5. FloatingDollar.tsx
Símbolos $ flotantes en el fondo con animación.

### 6. Confetti.tsx
Lluvia de confeti colorido para celebraciones.

### 7. ParticleBackground.tsx
Partículas brillantes (Sparkles) flotando en el fondo.

---

## ✨ ANIMACIONES

### Definidas en `tailwind.config.ts`:

```typescript
keyframes: {
  "float": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
  "float-slow": {
    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
    "50%": { transform: "translateY(-30px) rotate(5deg)" },
  },
  "shimmer": {
    "0%": { transform: "translateX(-100%) skewX(-12deg)" },
    "100%": { transform: "translateX(200%) skewX(-12deg)" },
  },
  "rainbow": {
    "0%": { filter: "hue-rotate(0deg)" },
    "100%": { filter: "hue-rotate(360deg)" },
  },
  "pulse-gold": {
    "0%, 100%": { opacity: "1", transform: "scale(1)" },
    "50%": { opacity: "0.8", transform: "scale(1.05)" },
  },
  "pulse-crazy": {
    "0%, 100%": { transform: "scale(1)" },
    "25%": { transform: "scale(1.15)" },
    "50%": { transform: "scale(1)" },
    "75%": { transform: "scale(0.9)" },
  },
  "spin-slow": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "bounce-crazy": {
    "0%, 100%": { transform: "translateY(0) scale(1)" },
    "50%": { transform: "translateY(-30px) scale(1.2)" },
  },
  "confetti-fall": {
    "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
    "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
  },
  "slide-up": {
    "0%": { transform: "translateY(100%)", opacity: "0" },
    "100%": { transform: "translateY(0)", opacity: "1" },
  },
}
```

### Secuencia de animación inicial (Index.tsx):
1. **500ms:** Aparece símbolo $ (scale-in + spin-slow + bounce-crazy)
2. **2000ms:** Aparece título "Luxury Life" (fade-in + scale-in)
3. **2500ms:** Lluvia de confeti (3.5 segundos)

---

## 📦 ASSETS

### Imágenes de vehículos:
| Asset | Formato | Uso |
|-------|---------|-----|
| `level1-sports-car.png` | PNG | Sports Car |
| `level2-yacht.jpeg` | JPEG | Yacht |
| `level3-helicopter.webp` | WebP | Helicopter |
| `level4-jet.webp` | WebP | Private Jet |
| `level5-mansion.png` | PNG | Mansion |
| `luxury-island.webp` | WebP | Luxury Island (Bonus) |

### Otros assets:
| Asset | Uso |
|-------|-----|
| `purchase-applause.mp3` | Audio de celebración en BonusScreen |
| `dollar-gold.png` | Símbolo $ (alternativo) |
| `dollar-3d.png` | Símbolo $ 3D (alternativo) |
| `app-icon.png` | Icono de la app (public/) |
| `feature-graphic.png` | Gráfico promocional (public/) |

---

## 📱 CONFIGURACIÓN ANDROID

### Capacitor Config (`capacitor.config.ts`):
```typescript
const config: CapacitorConfig = {
  appId: 'app.luxurylife.charity',
  appName: 'Luxury Life',
  webDir: 'dist',
  android: {
    buildOptions: {
      keystorePath: process.env.KEYSTORE_PATH || 'release-key.jks',
      keystorePassword: process.env.KEYSTORE_PASSWORD,
      keystoreAlias: process.env.KEYSTORE_ALIAS || 'luxury-life',
      keystoreAliasPassword: process.env.KEYSTORE_ALIAS_PASSWORD,
    }
  }
};
```

### Archivos de Build:

#### 1. `android-build.bat` (Windows)
- Verifica/crea keystore
- Build del proyecto web
- Añade Android si no existe
- Sync con Capacitor
- Ejecuta script de firmado
- Genera AAB
- Abre carpeta con el resultado

#### 2. `scripts/android/prepare-android-release.mjs`
- Crea `android/keystore.properties`
- Parcha `android/app/build.gradle` para firmado
- Incrementa versionCode automáticamente

---

## 🚀 BUILD Y DEPLOYMENT

### Variables de entorno necesarias:
```bash
# Windows
set KEYSTORE_PATH=release-key.jks
set KEYSTORE_ALIAS=luxury-life
set KEYSTORE_PASSWORD=TuContraseña
set KEYSTORE_ALIAS_PASSWORD=TuContraseña

# Mac/Linux
export KEYSTORE_PATH=release-key.jks
export KEYSTORE_ALIAS=luxury-life
export KEYSTORE_PASSWORD=TuContraseña
export KEYSTORE_ALIAS_PASSWORD=TuContraseña
```

### Comandos de build:
```bash
# Clonar
git clone https://github.com/ferranmysticgarden/animate-joyful-launch.git
cd animate-joyful-launch
npm install

# Añadir Android (primera vez)
npx cap add android

# Build Windows
android-build.bat

# Build Mac/Linux
chmod +x android-build.sh
./android-build.sh
```

### Ubicación del AAB:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## ⚖️ LEGAL Y CARIDAD

### Donación:
- **Porcentaje:** 70% de ingresos netos
- **Beneficiario:** UNICEF (United Nations Children's Fund)
- **Enlaces de donación:**
  - Internacional: https://www.unicef.org/donate
  - España: https://www.unicef.es/donacion

### Política de Privacidad (`/privacy`):
- Solo se recoge email para pagos
- Datos procesados por Stripe
- 70% donado a UNICEF
- Sin cookies de tracking

### Términos de Servicio (`/terms`):
- Items virtuales sin valor real
- No hay propiedad real
- 70% a UNICEF
- Reembolsos en 14 días

---

## 🔐 VARIABLES DE ENTORNO

### Frontend (`.env` - AUTO-GENERADO):
```
VITE_SUPABASE_URL=https://wdcmoqtfcgcjxugezuvw.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
VITE_SUPABASE_PROJECT_ID=wdcmoqtfcgcjxugezuvw
```

### Backend (Secrets de Supabase Cloud):
```
STRIPE_SECRET_KEY=sk_live_...
```

### Android Build:
```
KEYSTORE_PATH=release-key.jks
KEYSTORE_ALIAS=luxury-life
KEYSTORE_PASSWORD=...
KEYSTORE_ALIAS_PASSWORD=...
BUMP_VERSION_CODE=1  # (o 0 para no incrementar)
```

---

## 📊 INFORMACIÓN PARA GOOGLE PLAY

### Datos de la app:
| Campo | Valor |
|-------|-------|
| **App Name** | Luxury Life - Charity Game |
| **Package ID** | app.luxurylife.charity |
| **Categoría** | Application > Lifestyle |
| **Precio** | Free (con in-app purchases) |
| **Edad** | 18+ (transacciones reales) |

### Descripción corta (80 chars):
```
Live the dream! Buy luxury items & 70% goes to UNICEF. Play for a cause.
```

### Descripción larga:
```
🌟 LUXURY LIFE - THE CHARITY GAME 🌟

Ever dreamed of owning a sports car, yacht, helicopter, private jet, or even a luxury island? 
Now you can experience the thrill of luxury purchases while making a real difference in the world!

✨ HOW IT WORKS
Tap to collect virtual dollars and unlock stunning luxury items. Each purchase brings you 
closer to the ultimate dream lifestyle - and helps children in need worldwide.

🎁 WHAT YOU CAN BUY
• Level 1: Sports Car - €100
• Level 2: Luxury Yacht - €200  
• Level 3: Private Helicopter - €300
• Level 4: Private Jet - €400
• Level 5: Dream Mansion - €500
• Level 6: Luxury Island - €1,000

❤️ PLAY FOR A CAUSE
This isn't just a game - it's a movement. 70% of all net revenue is donated directly to 
UNICEF to help children around the world access education, healthcare, and protection.

🔒 IMPORTANT DISCLAIMER
• All purchases are virtual entertainment items with no real-world value
• You will NOT receive any physical products
• This is a charity-focused entertainment experience
• All proceeds support UNICEF's global mission

#CharityGame #UNICEF #LuxuryLife #PlayForACause
```

### Assets requeridos:
- ✅ Icono 512x512: `public/app-icon.png`
- ✅ Feature Graphic 1024x500: `public/feature-graphic.png`
- ⬜ Screenshots (mín. 2 por dispositivo)

---

## 🔄 PERSISTENCIA LOCAL

### Hook: `usePurchases.ts`

```typescript
// localStorage keys:
const PURCHASES_KEY = 'luxury_purchases';      // number[] - niveles comprados
const UNLOCKS_KEY = 'luxury_unlocked_levels';  // number[] - niveles desbloqueados

// Funciones:
- purchaseLevel(level: number)  // Marca nivel como comprado
- isPurchased(level: number)    // Verifica si está comprado
- allLevelsPurchased()          // Verifica si niveles 1-5 están comprados
- resetPurchases()              // Limpia todas las compras
```

### Flujo de desbloqueo nivel 6:
1. Usuario compra nivel 5 (Mansion)
2. `PaymentSuccess.tsx` detecta level=5
3. Añade 6 a `luxury_unlocked_levels`
4. `Garage.tsx` muestra nivel 6 (Luxury Island)

---

## 📝 NOTAS ADICIONALES

1. **Sin autenticación obligatoria:** Los usuarios compran como invitados (solo email)
2. **Pagos en nueva pestaña:** Stripe Checkout se abre en `_blank`
3. **Audio solo en Bonus:** El sonido de aplausos solo suena en BonusScreen
4. **versionCode automático:** Se incrementa en cada build
5. **Keystore persistente:** GUARDAR `release-key.jks` y contraseñas para siempre

---

## 🛠️ PARA CLONAR ESTE PROYECTO

```bash
# 1. Clonar
git clone https://github.com/ferranmysticgarden/animate-joyful-launch.git
cd animate-joyful-launch

# 2. Instalar dependencias
npm install

# 3. Desarrollo local
npm run dev

# 4. Build para producción
npm run build

# 5. Build Android (con variables de entorno configuradas)
npx cap add android
android-build.bat  # Windows
./android-build.sh # Mac/Linux
```

### Requiere configurar:
1. Proyecto Supabase con tabla `purchases`
2. Edge function `create-payment`
3. Stripe account con los 6 productos/precios
4. Secret `STRIPE_SECRET_KEY` en Supabase
5. Keystore para firmar Android

---

**Documento generado automáticamente - Luxury Life v1.0.0**
