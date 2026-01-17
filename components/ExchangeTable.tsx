"use client";

import {
    ChevronDown,
    ShoppingCart,
    Activity,
    TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";
import { getLiveRates, type CurrencyData } from "@/app/actions/currency";

const FLAG_MAP: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    CHF: "🇨🇭",
    AUD: "🇦🇺",
    CAD: "🇨🇦",
    TRY: "🇹🇷",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    SEK: "🇸🇪",
    NZD: "🇳🇿",
    MXN: "🇲🇽",
    SGD: "🇸🇬",
    HKD: "🇭🇰",
    NOK: "🇳🇴",
    KRW: "🇰🇷",
    INR: "🇮🇳",
    RUB: "🇷🇺",
    ZAR: "🇿🇦",
    BRL: "🇧🇷",
};

const POPULAR_CURRENCIES = ["TRY", "USD", "EUR", "GBP", "CHF", "JPY"];

export default function ExchangeTable() {
    const [baseCurrency, setBaseCurrency] = useState("TRY");
    const [rates, setRates] = useState<CurrencyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch rates relative to the selected base (e.g., from=TRY)
                // The API returns 1 TRY = X USD.
                // We want to display USD/TRY (1 USD = ? TRY).
                // So we will INVERT the rates received.
                const data = await getLiveRates(baseCurrency);
                setRates(data);
            } catch (err) {
                console.error("Failed to fetch rates", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseCurrency]);

    // Filter to show only some popular ones or all? 
    // Let's show a good mix but prioritize popular ones.
    // For now showing all that have flags or just first N? 
    // Let's filter by FLAG_MAP keys to keep it clean.
    const displayRates = rates.filter(r => FLAG_MAP[r.code]);

    return (
        <div className="w-full mt-20 p-2 rounded-t-3xl bg-sky-400/30 backdrop-blur-md border border-white/10 shadow-2xl min-h-[500px]">
            {/* Currency Selector */}
            <div className="absolute top-4 right-8 z-20">
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 bg-black/40 text-white px-4 py-2 rounded-xl hover:bg-black/50 transition-colors border border-white/10"
                    >
                        <span className="text-xl">{FLAG_MAP[baseCurrency] || "🌐"}</span>
                        <span className="font-bold">{baseCurrency}</span>
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                            {POPULAR_CURRENCIES.map(curr => (
                                <button
                                    key={curr}
                                    onClick={() => {
                                        setBaseCurrency(curr);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-3 transition-colors"
                                >
                                    <span>{FLAG_MAP[curr]}</span>
                                    <span>{curr}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <table className="w-full text-white">
                <thead>
                    <tr className="border-b border-white/10 text-sm font-semibold">
                        <th className="py-4 pl-8 text-left">
                            <div className="flex items-center gap-2">
                                Unit <span className="text-xs text-white/50">(Base: {baseCurrency})</span>
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
                <tbody className="relative">
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="py-20 text-center text-white/50">
                                Loading rates...
                            </td>
                        </tr>
                    ) : (
                        displayRates.map((rateData, index) => {
                            // Inversion Logic
                            // API: 1 Base = rateData.rate Foreign
                            // We want: 1 Foreign = ? Base
                            // So Val = 1 / rateData.rate
                            const val = 1 / rateData.rate;
                            const prevVal = 1 / rateData.previousRate;

                            // Calculate percentage change
                            const increase = ((val - prevVal) / prevVal) * 100;

                            // Simulate spread
                            const buying = val * 0.9990; // Slightly less
                            const sales = val * 1.0010;  // Slightly more

                            return (
                                <tr
                                    key={rateData.code}
                                    className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${index % 2 === 0 ? '' : 'bg-black/5'}`}
                                >
                                    <td className="py-4 pl-8">
                                        <div className="flex items-center gap-8">
                                            <span className="text-3xl drop-shadow-md">{FLAG_MAP[rateData.code] || "🏳️"}</span>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-200">{rateData.code}/{baseCurrency}</span>
                                            </div>
                                            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-300 ml-auto mr-12 bg-black/20 px-2 py-0.5 rounded">
                                                {rateData.date} <span className="opacity-70">🕒</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-center font-medium text-lg tracking-wide text-gray-100">
                                        {formatCurrency(buying)}
                                    </td>
                                    <td className="py-4 text-center font-medium text-lg tracking-wide text-gray-100">
                                        {formatCurrency(sales)}
                                    </td>
                                    <td className={`py-4 pr-8 text-right font-bold text-lg ${increase > 0
                                        ? 'text-green-400'
                                        : increase < 0 ? 'text-red-400' : 'text-gray-400'
                                        }`}>
                                        %{increase.toFixed(2)}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

function formatCurrency(val: number) {
    // If value is small, show more decimals
    if (val < 1) return val.toFixed(4);
    if (val < 10) return val.toFixed(3);
    return val.toFixed(2); // Standard for USD/EUR etc against TRY which are ~30
}
