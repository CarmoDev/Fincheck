import { Logotype } from "../components/Logotype";
import { UserMenu } from "../components/UserMenu";
import { DashboardContext, DashboardProvider } from "./DashboardContext";
import { Accounts } from "./components/Accounts";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions";
import { EditAccountModal } from "./modals/EditAccountModal";
import { NewAccountModal } from "./modals/NewAccountModal";
import { NewTransactionModal } from "./modals/NewTransactionsModal";

export default function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 flex flex-col gap-4 md:px-8 pb-8 pt-6">
            <nav className="h-12 flex items-center justify-between">
              <Logotype className="h-6 text-teal-900" />
              <UserMenu />
            </nav>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-[95%]">
              <Accounts />

              <Transactions />
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
