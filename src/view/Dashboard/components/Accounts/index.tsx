import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { cn } from "../../../../app/utils/cn";
import { Spinner } from "../../../components/spinner";
import { PlusIcon } from "@radix-ui/react-icons";

export function Accounts() {
    const {
        sliderState,
        setSliderState,
        windowWidth,
        areValuesVisible,
        toggleValuesVisibility,
        isLoading,
        accounts,
        openNewAccountModal,
        currentBalance,
    } = useAccountsController();

    return (
        <aside className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 md:w-1/2 flex flex-col">
            {isLoading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
                </div>
            )}

            {!isLoading && (
                <>
                    <header className="flex w-full justify-between items-center">
                        <div>
                            <span className="tracking-[-0.5px] text-white block">
                                Saldo total
                            </span>

                            <div className="flex items-center gap-2">
                                <strong
                                    className={cn(
                                        "text-2xl tracking-[-1px] text-white",
                                        !areValuesVisible && "blur-md"
                                    )}
                                >
                                    {formatCurrency(currentBalance)}
                                </strong>

                                <button
                                    onClick={toggleValuesVisibility}
                                    className="w-8 h-8 flex items-center justify-center"
                                >
                                    <EyeIcon open={!areValuesVisible} />
                                </button>
                            </div>
                        </div>
                    </header>

                    <section className="flex-1 flex justify-end flex-col item mt-10 md:mt-0">
                        {accounts.length === 0 && (
                            <>
                                <header slot="container-start" className="mb-4">
                                    <strong className="text-white tracking-[-.5px] text-lg font-bold">
                                        Minhas contas
                                    </strong>
                                </header>

                                <button
                                    onClick={openNewAccountModal}
                                    className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/5 transition-colors"
                                >
                                    <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                                        <PlusIcon className="w-6 h-6" />
                                    </div>
                                    <span className="font-medium tracking-[-0.5px] block w-32 text-center">
                                        Cadastre uma nova conta
                                    </span>
                                </button>
                            </>
                        )}

                        {accounts.length > 0 && (
                            <div>
                                <Swiper
                                    spaceBetween={16}
                                    slidesPerView={
                                        windowWidth >= 500 ? 2.1 : 1.2
                                    }
                                    onSlideChange={(swiper) => {
                                        setSliderState({
                                            isBeginning: swiper.isBeginning,
                                            isEnd: swiper.isEnd,
                                        });
                                    }}
                                >
                                    <header
                                        slot="container-start"
                                        className="flex items-center justify-between mb-4"
                                    >
                                        <strong className="text-white tracking-[-.5px] text-lg font-bold">
                                            Minhas contas
                                        </strong>

                                        <SliderNavigation
                                            isBeginning={
                                                sliderState.isBeginning
                                            }
                                            isEnd={sliderState.isEnd}
                                        />
                                    </header>

                                    {accounts.map((account) => (
                                        <SwiperSlide key={account.id}>
                                            <AccountCard data={account} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </section>
                </>
            )}
        </aside>
    );
}
