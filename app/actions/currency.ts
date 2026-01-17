'use server';

export type CurrencyData = {
    code: string;
    rate: number;
    previousRate: number;
    date: string;
};

export type ExchangeRatesResponse = {
    base: string;
    date: string;
    rates: Record<string, number>;
};

export async function getLiveRates(base: string = 'TRY') {
    try {
        // 1. Fetch current rates
        const todayRes = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
        if (!todayRes.ok) throw new Error('Failed to fetch latest rates');
        const todayData: ExchangeRatesResponse = await todayRes.json();

        // 2. Fetch yesterday's rates (for percentage change)
        // Calculate yesterday's date formatted as YYYY-MM-DD
        const date = new Date();
        date.setDate(date.getDate() - 1);

        // Skip weekends roughly (simple approach: if Sun(0) -> Fri, if Sat(6) -> Fri)
        // Frankfurter automatically handles weekends by returning the last available trading day if we request a specific date, 
        // but requesting 'latest' gives us the most recent. 
        // For "yesterday", we simply ask for 1 day ago. If it was a weekend, API might handle or we might get same day.
        // Better approach for percentage: get a date definitely before today.
        // Let's just try yesterday.
        const yesterdayStr = date.toISOString().split('T')[0];

        const yesterdayRes = await fetch(`https://api.frankfurter.app/${yesterdayStr}?from=${base}`);
        let yesterdayData: ExchangeRatesResponse | null = null;

        if (yesterdayRes.ok) {
            yesterdayData = await yesterdayRes.json();
        }

        // 3. Combine data
        const combinedData: CurrencyData[] = Object.entries(todayData.rates).map(([symbol, rate]) => {
            const prevRate = yesterdayData?.rates[symbol] || rate;
            return {
                code: symbol,
                rate: rate,
                previousRate: prevRate,
                date: todayData.date,
            };
        });

        // Sort by code or valid criteria if needed. 
        // Let's return a subset or all. The user's table had specific ones.
        // We will return all, frontend can filter.
        return combinedData;

    } catch (error) {
        console.error('Error fetching rates:', error);
        return [];
    }
}
