"use client";

import {
    ChevronDown,
    ShoppingCart,
    Activity,
    TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLiveRates, type CurrencyData } from "@/app/actions/currency";

import { motion } from "framer-motion";

const CURRENCY_TO_FLAG_CODE: Record<string, string> = {
    USD: "us",
    EUR: "eu",
    GBP: "gb",
    CHF: "ch",
    AUD: "au",
    CAD: "ca",
    TRY: "tr",
    JPY: "jp",
    CNY: "cn",
    SEK: "se",
    NZD: "nz",
    MXN: "mx",
    SGD: "sg",
    HKD: "hk",
    NOK: "no",
    KRW: "kr",
    INR: "in",
    RUB: "ru",
    ZAR: "za",
    BRL: "br",
};

const POPULAR_CURRENCIES = ["TRY", "USD", "EUR", "GBP", "CHF", "JPY"];

export default function ExchangeTable() {
    const router = useRouter();
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
    const displayRates = rates.filter(r => CURRENCY_TO_FLAG_CODE[r.code]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full mt-20 p-2 rounded-t-3xl bg-sky-400/30 backdrop-blur-md border border-white/10 shadow-2xl min-h-[500px]"
        >
            {/* Currency Selector Toolbar */}
            <div className="flex justify-end px-4 py-2 mb-2">
                <div className="relative z-20">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 bg-black/40 text-white px-4 py-2 rounded-xl hover:bg-black/50 transition-colors border border-white/10"
                    >
                        <img
                            src={`https://flagcdn.com/w40/${CURRENCY_TO_FLAG_CODE[baseCurrency] || 'un'}.png`}
                            srcSet={`https://flagcdn.com/w80/${CURRENCY_TO_FLAG_CODE[baseCurrency] || 'un'}.png 2x`}
                            alt={baseCurrency}
                            className="w-6 h-4 object-cover rounded shadow-sm"
                        />
                        <span className="font-bold">{baseCurrency}</span>
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-32 z-50 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                            {POPULAR_CURRENCIES.map(curr => (
                                <button
                                    key={curr}
                                    onClick={() => {
                                        setBaseCurrency(curr);
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-3 transition-colors"
                                >
                                    <img
                                        src={`https://flagcdn.com/w40/${CURRENCY_TO_FLAG_CODE[curr] || 'un'}.png`}
                                        srcSet={`https://flagcdn.com/w80/${CURRENCY_TO_FLAG_CODE[curr] || 'un'}.png 2x`}
                                        alt={curr}
                                        className="w-5 h-3.5 object-cover rounded shadow-sm"
                                    />
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
                                <motion.tr
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                    key={rateData.code}
                                    onClick={() => router.push(`/currency/${rateData.code}?base=${baseCurrency}`)}
                                    className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer ${index % 2 === 0 ? '' : 'bg-black/5'}`}
                                >
                                    <td className="py-4 pl-8">
                                        <div className="flex items-center gap-8">
                                            <img
                                                src={`https://flagcdn.com/w80/${CURRENCY_TO_FLAG_CODE[rateData.code] || 'un'}.png`}
                                                srcSet={`https://flagcdn.com/w160/${CURRENCY_TO_FLAG_CODE[rateData.code] || 'un'}.png 2x`}
                                                alt={rateData.code}
                                                className="w-10 h-7 object-cover rounded shadow-md"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-200 text-lg">{rateData.code}</span>
                                                <span className="text-xs text-gray-500">{rateData.code}/{baseCurrency}</span>
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
                                </motion.tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </motion.div>
    );
}

function formatCurrency(val: number) {
    // If value is small, show more decimals
    if (val < 1) return val.toFixed(4);
    if (val < 10) return val.toFixed(3);
    return val.toFixed(2); // Standard for USD/EUR etc against TRY which are ~30
}
