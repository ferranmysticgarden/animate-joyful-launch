import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { NativePurchases, PURCHASE_TYPE, type Transaction } from "@capgo/native-purchases";

// Product IDs matching Google Play Console
export const PRODUCT_IDS: Record<number, string> = {
  1: "luxury_sports_car",      // €100
  2: "luxury_yacht",           // €200
  3: "luxury_helicopter",      // €300
  4: "luxury_private_jet",     // €400
  5: "luxury_mansion",         // €500
  6: "luxury_island",          // €1000
  7: "luxury_paradise_island", // €5000
  8: "luxury_space_station",   // €10000
  9: "luxury_planet",          // €50000
};

interface ProductInfo {
  productId: string;
  price: string;
  title: string;
  description: string;
}

export const useGooglePlayBilling = () => {
  const [isNative, setIsNative] = useState(false);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [purchasedLevels, setPurchasedLevels] = useState<number[]>([]);

  useEffect(() => {
    const isNativePlatform = Capacitor.isNativePlatform();
    setIsNative(isNativePlatform);

    if (isNativePlatform) {
      initializeBilling();
      loadPurchases();
    }
  }, []);

  const initializeBilling = async () => {
    try {
      // Get available products from Google Play
      const productIds = Object.values(PRODUCT_IDS);
      const { products: fetchedProducts } = await NativePurchases.getProducts({
        productIdentifiers: productIds,
        productType: PURCHASE_TYPE.INAPP,
      });
      
      setProducts(fetchedProducts.map(p => ({
        productId: p.identifier,
        price: p.priceString || "",
        title: p.title || "",
        description: p.description || "",
      })));
    } catch (error) {
      console.error("Failed to initialize billing:", error);
    }
  };

  const loadPurchases = async () => {
    try {
      const { purchases } = await NativePurchases.getPurchases({
        productType: PURCHASE_TYPE.INAPP,
      });

      const levels: number[] = [];
      purchases.forEach((transaction: Transaction) => {
        // Check if purchase is valid (purchaseState "1" = PURCHASED on Android)
        if (transaction.purchaseState === "1" && transaction.isAcknowledged) {
          // Find level from product ID
          const level = Object.entries(PRODUCT_IDS).find(
            ([, id]) => id === transaction.productIdentifier
          );
          if (level) {
            levels.push(parseInt(level[0]));
          }
        }
      });

      setPurchasedLevels(levels);
      
      // Sync with localStorage
      const existing = JSON.parse(localStorage.getItem("luxury_purchases") || "[]");
      const merged = [...new Set([...existing, ...levels])];
      localStorage.setItem("luxury_purchases", JSON.stringify(merged));
    } catch (error) {
      console.error("Failed to load purchases:", error);
    }
  };

  const purchaseLevel = async (level: number): Promise<boolean> => {
    if (!isNative) {
      console.warn("Google Play Billing only works on Android");
      return false;
    }

    const productId = PRODUCT_IDS[level];
    if (!productId) {
      console.error("Invalid level:", level);
      return false;
    }

    setIsLoading(true);
    try {
      const transaction = await NativePurchases.purchaseProduct({
        productIdentifier: productId,
        productType: PURCHASE_TYPE.INAPP,
      });

      // Check if purchase was successful
      if (transaction.purchaseState === "1") {
        // Acknowledge the purchase if not already
        if (!transaction.isAcknowledged && transaction.purchaseToken) {
          await NativePurchases.acknowledgePurchase({
            purchaseToken: transaction.purchaseToken,
          });
        }

        // Update local state
        setPurchasedLevels(prev => [...prev, level]);
        
        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem("luxury_purchases") || "[]");
        localStorage.setItem("luxury_purchases", JSON.stringify([...existing, level]));

        return true;
      }

      return false;
    } catch (error) {
      console.error("Purchase failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const restorePurchases = async () => {
    if (!isNative) return;
    
    setIsLoading(true);
    try {
      await loadPurchases();
    } finally {
      setIsLoading(false);
    }
  };

  const getProductPrice = (level: number): string | null => {
    const productId = PRODUCT_IDS[level];
    const product = products.find(p => p.productId === productId);
    return product?.price || null;
  };

  return {
    isNative,
    isLoading,
    products,
    purchasedLevels,
    purchaseLevel,
    restorePurchases,
    getProductPrice,
    isPurchased: (level: number) => purchasedLevels.includes(level),
  };
};
