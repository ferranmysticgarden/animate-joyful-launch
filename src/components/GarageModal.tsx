import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface GarageModalProps {
  open: boolean;
  onClose: () => void;
  onYes: () => void;
  question: string;
  yesText: string;
  noText: string;
}

export const GarageModal = ({ open, onClose, onYes, question, yesText, noText }: GarageModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-sm border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center text-foreground font-bold mb-6">
            {question}
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onYes}
            size="lg"
            className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-glow"
          >
            {yesText}
          </Button>
          <Button
            onClick={onClose}
            size="lg"
            variant="destructive"
            className="px-8 py-6 text-xl font-bold shadow-md"
          >
            {noText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
