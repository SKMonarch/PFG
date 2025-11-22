import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CryptoActions from "./CryptoActions";

export default function CryptoTradeModal({ open, onClose, cryptoSymbol }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Operar {cryptoSymbol?.toUpperCase()}</DialogTitle>
        </DialogHeader>

        <CryptoActions presetCrypto={cryptoSymbol} />
      </DialogContent>
    </Dialog>
  );
}
