"use client";

import {
    ChevronDown,
    ShoppingCart,
    Activity,
    TrendingUp
} from "lucide-react";

const rates = [
    { code: "USD/TRY", buying: "43,110", sales: "43,215", increase: "2,03%", time: "12:30", flag: "🇺🇸" },
    { code: "EUR/TRY", buying: "50,029", sales: "50,200", increase: "0,83%", time: "12:30", flag: "🇪🇺" },
    { code: "EUR/USD", buying: "1,1605", sales: "1,1626", increase: "1,26",  time: "12:30", flag: "🇪🇺" },
    { code: "GBP/TRY", buying: "57,409", sales: "57,753", increase: "3,90%", time: "12:30", flag: "🇬🇧" },
    { code: "CHF/TRY", buying: "53,110", sales: "53,915", increase: "0,13%", time: "12:30", flag: "🇨🇭" },
    { code: "AUD/TRY", buying: "27,961", sales: "28,915", increase: "5,13%", time: "12:30", flag: "🇦🇹" },
    { code: "CAD/TRY", buying: "30,566", sales: "31,199", increase: "1,19%", time: "12:30", flag: "🇨🇦" },
];

export default function ExchangeTable() {
    return (
        <div className="w-full mt-20 p-2  rounded-t-3xl bg-sky-400/30 backdrop-blur-md border border-white/10 shadow-2xl min-h-[500px]">
            <table className="w-full text-white">
                <thead>
                    <tr className="border-b border-white/10 text-sm font-semibold">
                        <th className="py-4 pl-8 text-left">
                            <div className="flex items-center gap-2">
                                Unit <ChevronDown size={14} />
                            </div>
                        </th>
                        <th className="py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                Buying <ShoppingCart size={14} />
                            </div>
                        </th>
                        <th className="py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                                Sales <Activity size={14} />
                            </div>
                        </th>
                        <th className="py-4 pr-8 text-right">
                            <div className="flex items-center justify-end gap-2">
                                Increase <TrendingUp size={14} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => (
                        <tr
                            key={index}
                            className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${index % 2 === 0 ? '' : 'bg-black/5'
                                }`}
                        >
                            <td className="py-4 pl-8">
                                <div className="flex items-center gap-8">
                                    <span className="text-3xl drop-shadow-md">{rate.flag}</span>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-200">{rate.code}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-300 ml-auto mr-12 bg-black/20 px-2 py-0.5 rounded">
                                        {rate.time} <span className="opacity-70">🕒</span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 text-center font-medium text-lg tracking-wide text-gray-100">
                                {rate.buying}
                            </td>
                            <td className="py-4 text-center font-medium text-lg tracking-wide text-gray-100">
                                {rate.sales}
                            </td>
                            <td className={`py-4 pr-8 text-right font-bold text-lg ${parseFloat(rate.increase.replace(',', '.')) > 1.5
                                ? 'text-green-400'
                                : 'text-red-400'
                                }`}>
                                {rate.increase}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
