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
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // Go back 7 days to ensure we get at least 2 data points (weekends etc)

        const endStr = endDate.toISOString().split('T')[0];
        const startStr = startDate.toISOString().split('T')[0];

        // Fetch time series data
        const res = await fetch(`https://api.frankfurter.app/${startStr}..${endStr}?from=${base}`);
        if (!res.ok) throw new Error('Failed to fetch rates');

        const data = await res.json();
        // data.rates is { "2024-01-10": { ... }, "2024-01-11": { ... } }

        // Sort dates to be sure
        const dates = Object.keys(data.rates).sort();

        if (dates.length < 1) return [];

        const latestDate = dates[dates.length - 1];
        const previousDate = dates.length > 1 ? dates[dates.length - 2] : latestDate;

        const latestRates = data.rates[latestDate];
        const previousRates = data.rates[previousDate];

        const combinedData: CurrencyData[] = Object.entries(latestRates).map(([symbol, rate]) => {
            const prevRate = previousRates[symbol] || (rate as number);
            return {
                code: symbol,
                rate: rate as number,
                previousRate: prevRate as number,
                date: latestDate,
            };
        });

        return combinedData;

    } catch (error) {
        console.error('Error fetching rates:', error);
        return [];
    }
}

export async function getHistoricalRates(base: string, target: string, days: number = 30) {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const endStr = endDate.toISOString().split('T')[0];
        const startStr = startDate.toISOString().split('T')[0];

        // Fetch historical data from Frankfurter
        const res = await fetch(`https://api.frankfurter.app/${startStr}..${endStr}?from=${base}&to=${target}`);

        if (!res.ok) throw new Error('Failed to fetch historical rates');

        const data = await res.json();

        // Transform response: { rates: { "2024-01-01": { "USD": 1.1 }, ... } }
        // into array: [{ date: "2024-01-01", rate: 1.1 }]
        const history: { date: string; rate: number }[] = Object.entries(data.rates).map(([date, rates]: [string, any]) => ({
            date,
            rate: rates[target]
        }));

        return history;
    } catch (error) {
        console.error('Error fetching historical rates:', error);
        return [];
    }
}
