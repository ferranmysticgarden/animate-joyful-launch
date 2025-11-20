import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onPurchase: () => void;
  vehicleName: string;
  price: string;
  purchaseText: string;
  forText: string;
  acquireText: string;
  cancelText: string;
}

export const PurchaseModal = ({
  open,
  onClose,
  onPurchase,
  vehicleName,
  price,
  purchaseText,
  forText,
  acquireText,
  cancelText,
}: PurchaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-sm border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-foreground font-bold mb-6">
            {purchaseText} {vehicleName} {forText} {price}?
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onPurchase}
            size="lg"
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-glow"
          >
            {acquireText}
          </Button>
          <Button
            onClick={onClose}
            size="lg"
            variant="destructive"
            className="px-8 py-6 text-xl font-bold shadow-md"
          >
            {cancelText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
