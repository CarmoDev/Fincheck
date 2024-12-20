import React, { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../app/entities/BankAccount";
import { useAuth } from "../../../app/hooks/useAuth";

interface DashboardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    toggleValuesVisibility(): void;
    openNewAccountModal(): void;
    closeNewAccountModal(): void;
    isNewTransactionModalOpen: boolean;
    newTransactionType: "INCOME" | "EXPENSE" | null;
    openNewTransactionModal(type: "INCOME" | "EXPENSE"): void;
    closeNewTransactionModal(): void;
    isEditAccountModalOpen: boolean;
    accountBeingEdited: null | BankAccount;
    openEditAccountModal(bankAccount: BankAccount): void;
    closeEditAccountModal(): void;
    openNewCategoryModal(): void;
    closeNewCategoryModal(): void;
    isNewCategoryModalOpen: boolean;
    closeUpgradePlanModal(): void;
    isUpgradePlanModalOpen: boolean;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [areValuesVisible, setAreValuesVisible] = useState(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);
    const [newTransactionType, setNewTransactionType] = useState<
        "INCOME" | "EXPENSE" | null
    >(null);
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [accountBeingEdited, setAccountBeingEdited] =
        useState<null | BankAccount>(null);
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [isUpgradePlanModalOpen, setIsUpgradePlanModalOpen] = useState(false);

    const { isPremium } = useAuth();

    const toggleValuesVisibility = useCallback(() => {
        setAreValuesVisible((prevState) => !prevState);
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    const openNewTransactionModal = useCallback(
        (type: "INCOME" | "EXPENSE") => {
            setIsNewTransactionModalOpen(true);
            setNewTransactionType(type);
        },
        []
    );

    const closeNewTransactionModal = useCallback(() => {
        setNewTransactionType(null);
        setIsNewTransactionModalOpen(false);
    }, []);

    const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
        setIsEditAccountModalOpen(true);
        setAccountBeingEdited(bankAccount);
    }, []);

    const closeEditAccountModal = useCallback(() => {
        setAccountBeingEdited(null);
        setIsEditAccountModalOpen(false);
    }, []);

    const openNewCategoryModal = useCallback(() => {
        if (isPremium) {
            setIsNewCategoryModalOpen(true);
            return;
        }

        setIsUpgradePlanModalOpen(true);
    }, [isPremium]);

    const closeNewCategoryModal = useCallback(() => {
        setIsNewCategoryModalOpen(false);
    }, []);

    const closeUpgradePlanModal = useCallback(() => {
        setIsUpgradePlanModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                areValuesVisible,
                toggleValuesVisibility,
                isNewAccountModalOpen,
                openNewAccountModal,
                closeNewAccountModal,
                isNewTransactionModalOpen,
                openNewTransactionModal,
                closeNewTransactionModal,
                newTransactionType,
                isEditAccountModalOpen,
                accountBeingEdited,
                openEditAccountModal,
                closeEditAccountModal,
                openNewCategoryModal,
                closeNewCategoryModal,
                isNewCategoryModalOpen,
                closeUpgradePlanModal,
                isUpgradePlanModalOpen,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}
