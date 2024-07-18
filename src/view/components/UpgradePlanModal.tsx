import UpgradeIcon from "@mui/icons-material/Upgrade";

import { Button } from "./Button";
import { Modal } from "./Modal";
import { useDashboard } from "../Dashboard/DashboardContext/useDashboardContext";
import { useNavigate } from "react-router-dom";

export function UpgradePlanModal() {
  const { closeUpgradePlanModal, isUpgradePlanModalOpen } = useDashboard();

  const navigate = useNavigate();

  return (
    <Modal
      open={isUpgradePlanModalOpen}
      title="Atualizar plano"
      accessibilityTitle={"Atualizar o plano"}
      onClose={closeUpgradePlanModal}
    >
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-teal-50 flex items-center justify-center">
          <UpgradeIcon className="w-6 h-6 text-teal-900" />
        </div>

        <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
          Funcionalidade Premium
        </p>

        <p className="text-gray-800 tracking-[-0.5px]">
          Atualize seu plano e tenha acesso a essa funcionalidade e muito mais!
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" onClick={() => navigate("/")}>
          Ter acesso ilimitado!
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={closeUpgradePlanModal}
        >
          Me manter limitado
        </Button>
      </div>
    </Modal>
  );
}
