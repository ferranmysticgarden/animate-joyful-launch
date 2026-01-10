import { useState, useEffect } from 'react';

const PURCHASES_KEY = 'luxury_purchases';

export const usePurchases = () => {
  const [purchasedLevels, setPurchasedLevels] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(PURCHASES_KEY);
    if (saved) {
      setPurchasedLevels(JSON.parse(saved));
    }
  }, []);

  const purchaseLevel = (level: number) => {
    const updated = [...purchasedLevels, level].filter((v, i, a) => a.indexOf(v) === i);
    setPurchasedLevels(updated);
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(updated));
  };

  const isPurchased = (level: number) => purchasedLevels.includes(level);

  const allLevelsPurchased = () => [1, 2, 3, 4, 5].every(l => purchasedLevels.includes(l));

  const resetPurchases = () => {
    setPurchasedLevels([]);
    localStorage.removeItem(PURCHASES_KEY);
  };

  return { purchasedLevels, purchaseLevel, isPurchased, allLevelsPurchased, resetPurchases };
};
