"use client";

import NewProductPage from "@/components/provider/NewProductPage";
import ProviderMenu from "@/components/provider/ProviderMenu";

export default function Page() {
  return (
    <section className="flex min-h-screen bg-white">
      <div className="w-[220px] border-r border-gray-200 bg-white shadow-md mt-20">
        <ProviderMenu />
      </div>

      <div className="flex-1 p-6">
        <NewProductPage />
      </div>
    </section>
  );
}
