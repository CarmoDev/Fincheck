import { z } from "zod";
import { useDashboard } from "../../DashboardContext/useDashboardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../app/hooks/useBankAccount";
import { useCategories } from "../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../app/utils/currencyStringToNumber";

const schema = z.object({
    value: z.string().nonempty("Informe o valor"),
    name: z.string().nonempty("Informe o nome"),
    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe a conta"),
    qtyParcel: z.string(),
    date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useTransactionsModalController() {
    const {
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
    } = useDashboard();

    const {
        reset,
        control,
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData | Array<FormData>>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    const { accounts } = useBankAccounts();
    const { categories: categoriesList } = useCategories();
    const { isLoading: isLoadingCreateOne, mutateAsync: mutateAsyncCreateOne } =
        useMutation(transactionsService.create);

    const {
        isLoading: isLoadingCreateMany,
        mutateAsync: mutateAsyncCreateMany,
    } = useMutation(transactionsService.createMany);

    const handleSubmit = hookFormSubmit(async (data) => {
        function createTransactionsWithParcels(transactionData: FormData) {
            const transactions = [];

            const parcel = parseInt(transactionData.qtyParcel);

            if (parcel === 1) {
                return transactionData;
            }

            for (let i = 0; i < parcel; i++) {
                const currentDate = new Date(transactionData.date);
                currentDate.setMonth(currentDate.getMonth() + i);

                const isLastMonthOfYear =
                    i === parcel - 1 && currentDate.getMonth() === 11;
                if (isLastMonthOfYear) {
                    currentDate.setFullYear(currentDate.getFullYear() + 1);
                    currentDate.setMonth(0); // Janeiro
                }

                const transaction = {
                    ...transactionData,
                    date: currentDate,
                };

                transactions.push(transaction);
            }

            return transactions;
        }

        const parcelId = window.crypto.randomUUID();

        try {
            const transactions = !Array.isArray(data)
                ? createTransactionsWithParcels(data)
                : data;

            const isMany = Array.isArray(transactions);

            if (!isMany && parseInt(transactions.qtyParcel) === 1) {
                await mutateAsyncCreateOne({
                    ...transactions,
                    value: currencyStringToNumber(transactions.value),
                    type: newTransactionType!,
                    qtyParcel: parseInt(transactions.qtyParcel),
                    date: transactions.date.toISOString(),
                    parcelId,
                });
            }

            if (isMany) {
                const mappedData = transactions.map((transaction) => ({
                    ...transaction,
                    date: transaction.date.toISOString(),
                    value: currencyStringToNumber(transaction.value),
                    type: newTransactionType!,
                    qtyParcel: parseInt(transaction.qtyParcel),
                    parcelId,
                }));

                await mutateAsyncCreateMany(mappedData);
            }

            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
            toast.success(
                newTransactionType === "EXPENSE"
                    ? "Despesa cadastrada com sucesso!"
                    : "Receita cadastrada com sucesso!"
            );
            closeNewTransactionModal();
            reset();
        } catch {
            toast.error(
                newTransactionType === "EXPENSE"
                    ? "Erro ao cadastrar a despesa!"
                    : "Erro ao cadastrar a Receita!"
            );
        }
    });

    const categories = useMemo(() => {
        return categoriesList.filter(
            (category) => category.type === newTransactionType
        );
    }, [categoriesList, newTransactionType]);

    return {
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
        handleSubmit,
        register,
        errors,
        control,
        accounts,
        categories,
        watch,
        isLoadingCreateOne,
        isLoadingCreateMany,
    };
}
