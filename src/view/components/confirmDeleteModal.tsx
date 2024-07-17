import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  onConfirmMany?(): void;
  title: string;
  description?: string;
  isLoading: boolean;
  isLoadingMany?: boolean;
  hasParcels?: boolean;
}

export function ConfirmDeleteModal({
  onConfirm,
  onConfirmMany,
  onClose,
  title,
  description,
  isLoading,
  isLoadingMany,
  hasParcels,
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      open
      title="Excluir"
      accessibilityTitle={"Deletar transação"}
      onClose={onClose}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
          {title}
        </p>

        {description && (
          <p className="text-gray-800 tracking-[-0.5px]">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir apenas essa
        </Button>

        {hasParcels && (
          <Button
            className="w-full bg-transparent text-red-900 border border-red-800 hover:bg-red-900 hover:text-white"
            variant="danger"
            onClick={onConfirmMany}
            isLoading={isLoadingMany}
          >
            Sim, desejo excluir todas
          </Button>
        )}

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
