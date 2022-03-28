export async function getCurrency(url?: string) {
    if (!url) url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    return await fetch(url).then(response => response.json())
}
