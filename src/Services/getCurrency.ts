export async function getCurrency() {
    return await fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(response =>
        response.json(),
    )
}
