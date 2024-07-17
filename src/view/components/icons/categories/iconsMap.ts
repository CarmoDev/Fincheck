import {
  WaterDrop,
  FlashOnOutlined,
  WaterfallChartOutlined,
  AccountTreeOutlined,
  PetsOutlined,
  HeartBroken,
  SpaOutlined,
  FitnessCenter,
  RedeemOutlined,
  CreditCardOutlined,
  PixOutlined,
  SellOutlined,
  SavingsOutlined,
  CurrencyBitcoin,
  AnalyticsOutlined,
  FavoriteBorderOutlined,
  ClassOutlined,
  Interests,
  NotInterestedOutlined,
  LocalTaxiOutlined,
} from "@mui/icons-material";

import { Clothes } from "./expense/Clothes";
import { Education } from "./expense/Education";
import { Expense } from "./expense/Expense";
import { Food } from "./expense/Food";
import { Fun } from "./expense/Fun";
import { Grocery } from "./expense/Grocery";
import { Home } from "./expense/Home";
import { Transport } from "./expense/Transport";
import { Travel } from "./expense/Travel";
import { Income } from "./income/Income";

export const iconsMap = {
  income: {
    default: Income,
  },
  expense: {
    default: Expense,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
  },
};

export const newIconsMap = {
  WaterDrop: WaterDrop,
  FlashOnOutlined: FlashOnOutlined,
  WaterfallChartOutlined: WaterfallChartOutlined,
  AccountTreeOutlined: AccountTreeOutlined,
  PetsOutlined: PetsOutlined,
  HeartBroken: HeartBroken,
  SpaOutlined: SpaOutlined,
  FitnessCenter: FitnessCenter,
  RedeemOutlined: RedeemOutlined,
  CreditCardOutlined: CreditCardOutlined,
  PixOutlined: PixOutlined,
  SellOutlined: SellOutlined,
  SavingsOutlined: SavingsOutlined,
  CurrencyBitcoin: CurrencyBitcoin,
  AnalyticsOutlined: AnalyticsOutlined,
  FavoriteBorderOutlined: FavoriteBorderOutlined,
  ClassOutlined: ClassOutlined,
  Interests: Interests,
  NotInterestedOutlined: NotInterestedOutlined,
  LocalTaxiOutlined: LocalTaxiOutlined,
};
