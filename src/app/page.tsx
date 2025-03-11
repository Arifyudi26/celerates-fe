import BarChart from "@/components/BarChart";
import PageTitle from "@/components/PageTitle";
import { CardContent } from "@/components/card";
import SalesCard from "@/components/SalesCard";
import { SalesProps } from "@/lib/types";

const userSalesData: SalesProps[] = [
  {
    name: "Arif Yudi",
    email: "arifyudi@email.com",
    salesAmount: "+$2,500.00",
  },
  {
    name: "Rina Kusuma",
    email: "rinakusuma@email.com",
    salesAmount: "+$1,750.00",
  },
  {
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    salesAmount: "+$899.00",
  },
  {
    name: "Siti Aisyah",
    email: "siti.aisyah@email.com",
    salesAmount: "+$450.00",
  },
  {
    name: "Dewi Lestari",
    email: "dewi.lestari@email.com",
    salesAmount: "+$120.00",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Page title */}
      <PageTitle title="Dashboard" />

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        {/* Sales Overview Chart */}
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>

        {/* Recent Sales Section */}
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Sales</p>
            <p className="text-sm text-gray-400">
              You made 265 sales this month.
            </p>
          </section>

          {/* Display list of recent sales */}
          {userSalesData.map((data, index) => (
            <SalesCard
              key={index}
              email={data.email}
              name={data.name}
              salesAmount={data.salesAmount}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
}
