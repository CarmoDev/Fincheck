import { FilterIcon } from "../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../components/icons/categories/CategoryIcon";
import { useTransactionsController } from "./useTransactionsController";
import { cn } from "../../../../app/utils/cn";
import { Spinner } from "../../../components/spinner";
import emptyStateImage from "../../../../assets/images/empty-state.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../modals/EditTransactionsModal";

export function Transactions() {
    const {
        areValuesVisible,
        isInitialLoading,
        isLoading,
        transactions,
        isFiltersModalOpen,
        handleOpenFiltersModal,
        handleCloseFiltersModal,
        handleChangeFilters,
        filters,
        handleApplyFilters,
        isEditModalOpen,
        handleOpenEditModal,
        handleCloseEditModal,
        transactionBeingEdited,
    } = useTransactionsController();

    const hasTransactions = transactions.length > 0;

    return (
        <section className="w-full md:w-1/2 bg-gray-100 rounded-2xl h-full flex flex-col py-10">
            {isInitialLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                </div>
            )}

            {!isInitialLoading && (
                <>
                    <FiltersModal
                        open={isFiltersModalOpen}
                        onClose={handleCloseFiltersModal}
                        onApplyFilters={handleApplyFilters}
                    />

                    <header>
                        <nav className="flex items-center justify-between mx-10">
                            <TransactionTypeDropdown
                                onSelect={handleChangeFilters("type")}
                                selectedType={filters.type}
                            />

                            <button onClick={handleOpenFiltersModal}>
                                <FilterIcon />
                            </button>
                        </nav>

                        <nav className="mt-6 relative mx-10">
                            <Swiper
                                slidesPerView={3}
                                centeredSlides
                                initialSlide={filters.month}
                                onSlideChange={(swiper) => {
                                    if (swiper.realIndex === filters.month)
                                        return;

                                    handleChangeFilters("month")(
                                        swiper.realIndex
                                    );
                                }}
                            >
                                <SliderNavigation />

                                {MONTHS.map((month, index) => (
                                    <SwiperSlide key={month}>
                                        {({ isActive }) => (
                                            <SliderOption
                                                isActive={isActive}
                                                month={month}
                                                index={index}
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </nav>
                    </header>

                    <article className="mt-4 space-y-2 flex-1 overflow-y-auto ">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full">
                                <Spinner className="w-10 h-10" />
                            </div>
                        )}

                        {!hasTransactions && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full mx-10">
                                <img
                                    src={emptyStateImage}
                                    alt="Empty state image"
                                    className="select-none"
                                />
                                <p className="text-gray-700 text-center">
                                    Não encontramos nenhuma transação
                                </p>
                            </div>
                        )}

                        {hasTransactions && !isLoading && (
                            <>
                                {transactionBeingEdited && (
                                    <EditTransactionModal
                                        open={isEditModalOpen}
                                        onClose={handleCloseEditModal}
                                        transaction={transactionBeingEdited}
                                    />
                                )}

                                {transactions.map((transaction) => (
                                    <div
                                        className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 mx-10"
                                        key={transaction.id}
                                        role="button"
                                        onClick={() =>
                                            handleOpenEditModal(transaction)
                                        }
                                    >
                                        <div className="flex-1 flex items-center gap-3">
                                            <CategoryIcon
                                                type={
                                                    transaction.type ===
                                                    "EXPENSE"
                                                        ? "expense"
                                                        : "income"
                                                }
                                                category={
                                                    transaction.category?.icon
                                                }
                                            />

                                            <div>
                                                <strong className="font-bold tracking-[-0.5px] block">
                                                    {transaction.name}
                                                </strong>
                                                <span className="text-sm text-gray-600 font">
                                                    {formatDate(
                                                        new Date(
                                                            transaction.date
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <span
                                            className={cn(
                                                "tracking-[-0.5] font-medium",
                                                transaction.type === "EXPENSE"
                                                    ? "text-red-800"
                                                    : "text-green-800",
                                                !areValuesVisible && "blur-sm"
                                            )}
                                        >
                                            {transaction.type === "EXPENSE"
                                                ? "-"
                                                : "+"}{" "}
                                            {formatCurrency(transaction.value)}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </article>
                </>
            )}
        </section>
    );
}
