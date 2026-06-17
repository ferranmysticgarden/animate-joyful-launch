
# Cambios propuestos (diff resumido)

ONG según memoria del proyecto: **UNICEF**. Si quieres otro nombre, dímelo antes de aplicar.

---

## 1. `src/components/VehicleCard.tsx`
- Quitar prop `originalPrice` de la interfaz y del componente.
- Eliminar el `<span>` con `line-through` (precio tachado).
- Eliminar el badge `SALE!`.
- El precio (`{price}`) queda solo, sin elementos adyacentes.

## 2. `src/components/EliteVehicleCard.tsx`
- Quitar prop `originalPrice` de la interfaz y del componente.
- Eliminar el `<span>` con `line-through`.
- Eliminar el badge `-33% OFF!` (gradient rojo/naranja).
- El precio queda solo.

## 3. `src/pages/Garage.tsx`
- Eliminar el campo `originalPrice` de los 9 objetos del array `allVehicles`.
- Quitar `originalPrice?: string` del tipo `Vehicle`.
- Quitar `originalPrice={vehicle.originalPrice}` de los dos sitios donde se pasa (VehicleCard y EliteVehicleCard).

## 4. `src/pages/Index.tsx`
- Borrar imports: `PurchaseNotification`, `PurchaseCounter`, `UrgencyTimer`.
- Borrar el JSX: `<PurchaseNotification />`, `<UrgencyTimer />`, `<PurchaseCounter />` y el div contenedor `pt-12`.
- Borrar la línea con `"🔥 Only 47 spots left at this price 🔥"` (el `<p>` completo).
- No se tocan los componentes archivo (siguen existiendo, solo dejan de usarse en Index).

## 5. `src/components/PurchaseModal.tsx`
Añadir, **encima** del bloque de botones (justo antes de `<div className="flex gap-4 justify-center pt-2">`), un panel:

```tsx
<div className="flex items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
  <p className="text-sm font-semibold text-foreground text-center">
    70% goes to UNICEF · 30% platform costs
  </p>
</div>
```
+ import `Heart` desde `lucide-react`.

## 6. `src/pages/PaymentSuccess.tsx`
Sustituir el `<p>` actual:
```
Thank you for your purchase. A portion of your payment goes to charity.
```
por:
```
Your donation receipt will be sent to your email.
```

---

## Lo que NO se toca
- Lógica de compra, hooks, Stripe, Google Play.
- Otros textos, estilos, rutas, traducciones.
- Archivos `UrgencyTimer.tsx`, `PurchaseCounter.tsx`, `PurchaseNotification.tsx` (se dejan en disco por si los reutilizas).

¿Aplico los cambios tal cual? ¿O cambio "UNICEF" por otro nombre de ONG?
