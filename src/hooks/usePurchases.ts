import { useState, useEffect } from 'react';

const PURCHASES_KEY = 'luxury_purchases';

export const usePurchases = () => {
  const [purchasedLevels, setPurchasedLevels] = useState<number[]>([]);

  useEffect(() => {
    // Current format: luxury_purchases = number[]
    const saved = localStorage.getItem(PURCHASES_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPurchasedLevels(parsed.filter((n) => typeof n === "number"));
          return;
        }
      } catch {
        // ignore
      }
    }

    // Legacy migration: luxuryPurchases = { level1: true, level2: true, bonus: true }
    const legacy = localStorage.getItem("luxuryPurchases");
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        if (parsed && typeof parsed === "object") {
          const levels = Object.keys(parsed)
            .filter((k) => k.startsWith("level") && parsed[k])
            .map((k) => Number(k.replace("level", "")))
            .filter((n) => Number.isFinite(n));

          if (levels.length) {
            setPurchasedLevels(levels);
            localStorage.setItem(PURCHASES_KEY, JSON.stringify(levels));
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const purchaseLevel = (level: number) => {
    const updated = [...purchasedLevels, level].filter((v, i, a) => a.indexOf(v) === i);
    setPurchasedLevels(updated);
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(updated));
  };

  const isPurchased = (level: number) => purchasedLevels.includes(level);

  const allLevelsPurchased = () => [1, 2, 3, 4, 5, 6, 7, 8, 9].every(l => purchasedLevels.includes(l));

  const resetPurchases = () => {
    setPurchasedLevels([]);
    localStorage.removeItem(PURCHASES_KEY);
  };

  return { purchasedLevels, purchaseLevel, isPurchased, allLevelsPurchased, resetPurchases };
};
