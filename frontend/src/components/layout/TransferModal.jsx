import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TransferForm from "./TransferForm";

export default function TransferModal({ open, onClose, presetUser }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar dinero</DialogTitle>
        </DialogHeader>

        <TransferForm presetUser={presetUser} />
      </DialogContent>
    </Dialog>
  );
}
