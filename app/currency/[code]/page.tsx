'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { getHistoricalRates } from '@/app/actions/currency';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CURRENCY_TO_FLAG_CODE: Record<string, string> = {
    USD: "us", EUR: "eu", GBP: "gb", CHF: "ch", AUD: "au", CAD: "ca",
    TRY: "tr", JPY: "jp", CNY: "cn", SEK: "se", NZD: "nz", MXN: "mx",
    SGD: "sg", HKD: "hk", NOK: "no", KRW: "kr", INR: "in", RUB: "ru",
    ZAR: "za", BRL: "br",
};

export default function CurrencyDetail() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const code = params.code as string; // Target currency (e.g., USD)
    const base = searchParams.get('base') || 'TRY'; // Base currency (e.g., TRY)

    const [history, setHistory] = useState<{ date: string; rate: number }[]>([]);
    const [loading, setLoading] = useState(true);

    // Invert rates logic:
    // API returns 1 Base (e.g. TRY) = X Target (e.g. USD) -> rate is small (~0.03)
    // We want to show 1 Target (USD) = Y Base (TRY) -> rate should be ~30
    // So we invert the API rate: displayedRate = 1 / apiRate

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await getHistoricalRates(base, code, 30);
            // Invert rates for display
            const invertedData = data.map(d => ({
                ...d,
                rate: 1 / d.rate
            }));
            setHistory(invertedData);
            setLoading(false);
        };
        loadData();
    }, [base, code]);

    const currentRate = history.length > 0 ? history[history.length - 1].rate : 0;
    const previousRate = history.length > 1 ? history[history.length - 2].rate : 0;
    const change = currentRate - previousRate;
    const percentageChange = previousRate ? (change / previousRate) * 100 : 0;
    const isPositive = change >= 0;

    const chartData = {
        labels: history.map(h => {
            const date = new Date(h.date);
            return `${date.getDate()}/${date.getMonth() + 1}`;
        }),
        datasets: [
            {
                label: `${code}/${base} Rate`,
                data: history.map(h => h.rate),
                fill: true,
                borderColor: isPositive ? '#4ade80' : '#f87171', // green-400 : red-400
                backgroundColor: isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#e2e8f0',
                bodyColor: '#e2e8f0',
                borderColor: 'rgba(148, 163, 184, 0.1)',
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    label: function (context: any) {
                        return `${context.parsed.y.toFixed(4)} ${base}`;
                    }
                }
            },
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                },
                ticks: {
                    color: '#94a3b8',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        }
    };

    if (!code) return null;

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <Navbar />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header / Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-slate-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Chart */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Title Section */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={`https://flagcdn.com/w80/${CURRENCY_TO_FLAG_CODE[code] || 'un'}.png`}
                                            srcSet={`https://flagcdn.com/w160/${CURRENCY_TO_FLAG_CODE[code] || 'un'}.png 2x`}
                                            alt={code}
                                            className="w-16 h-12 object-cover rounded-lg shadow-lg"
                                        />
                                        <div>
                                            <h1 className="text-3xl font-bold">{code} / {base}</h1>
                                            <p className="text-slate-400">Exchange Rate History</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold tracking-tight">
                                            {currentRate.toFixed(4)}
                                        </div>
                                        <div className={`flex items-center justify-end text-sm font-medium mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {isPositive ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                                            {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
                                            <span className="text-slate-500 ml-1">today</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Card */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm min-h-[400px]">
                                <Line data={chartData} options={options} />
                            </div>
                        </div>

                        {/* Sidebar - Stats */}
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                                <h3 className="text-lg font-semibold mb-4 text-slate-200">Market Stats</h3>
                                <div className="space-y-4">
                                    <StatRow
                                        label="Open"
                                        value={previousRate.toFixed(4)}
                                        icon={<Calendar size={18} className="text-blue-400" />}
                                    />
                                    <StatRow
                                        label="High (30d)"
                                        value={Math.max(...history.map(h => h.rate)).toFixed(4)}
                                        icon={<TrendingUp size={18} className="text-green-400" />}
                                    />
                                    <StatRow
                                        label="Low (30d)"
                                        value={Math.min(...history.map(h => h.rate)).toFixed(4)}
                                        icon={<TrendingDown size={18} className="text-red-400" />}
                                    />
                                    <StatRow
                                        label="Average (30d)"
                                        value={(history.reduce((a, b) => a + b.rate, 0) / history.length).toFixed(4)}
                                        icon={<DollarSign size={18} className="text-yellow-400" />}
                                    />
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 shadow-xl">
                                <h3 className="text-xl font-bold mb-2">Trade {code} Now</h3>
                                <p className="text-blue-100 text-sm mb-4">
                                    Get the best rates and lowest fees when you trade with Nomisma using our secure platform.
                                </p>
                                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                                    Start Trading
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

const StatRow = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
    <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg">
                {icon}
            </div>
            <span className="text-slate-400 text-sm">{label}</span>
        </div>
        <span className="font-mono font-medium text-slate-200">{value}</span>
    </div>
);
