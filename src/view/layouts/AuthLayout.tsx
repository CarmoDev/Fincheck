import { Outlet } from "react-router-dom";

import illustration from "../../assets/images/illustration.png";

import { Logotype } from "../components/Logotype";

export default function AuthLayout() {
  return (
    <main className="h-full w-full flex">
      <section className="w-full h-full flex items-center justify-center flex-col lg:w-1/2">
        <Logotype className="h-6 text-gray-500" />

        <div className="gap-16 w-full px-8 max-w-lg">
          <Outlet />
        </div>
      </section>

      <aside className="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex">
        <img
          src={illustration}
          alt="platform image"
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        <footer className="max-w-[656px] bottom-8 bg-white p-10 absolute rounded-b-[32px] mx-2">
          <Logotype className="text-teal-900 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-8">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </footer>
      </aside>
    </main>
  );
}
