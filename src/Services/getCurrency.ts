export interface ValuteItem {
    CharCode: string
    ID: string
    Name: string
    Nominal: number
    NumCode: string
    Previous: number
    Value: number
}

export interface CurrencyData {
    Date: string
    PreviousDate: string
    PreviousURL: string
    Timestamp: string
    Valute: {
        [key: string]: ValuteItem
    }
}

export function getCurrency(
    url: string = 'https://www.cbr-xml-daily.ru/daily_json.js',
): Promise<CurrencyData> {
    return fetch(url).then(response => response.json())
}

export async function getCurrencyHistory(
    currencyURL: string,
    count: number = 10,
): Promise<Array<CurrencyData>> {
    const result: Array<CurrencyData> = []

    let iterationsCount: number = count
    let iterationURL: string = currencyURL

    while (iterationsCount > 0) {
        const data = await getCurrency(iterationURL)
        result.push(data)

        iterationsCount--
        iterationURL = data.PreviousURL
    }

    return result
}