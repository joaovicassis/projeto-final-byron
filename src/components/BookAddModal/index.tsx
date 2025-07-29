import { Dialog, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface BookFormModalProps{
    isOpen: boolean;
    onClose: () => void;
}

export default function BookFormModal({ isOpen, onClose }: BookFormModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Livro</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}