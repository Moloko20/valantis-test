import React from 'react'

import { CurrencyDataType } from 'Components/CurrencyTRow'
import { CurrencyTHead } from 'Components/CurrencyTHead'
import { CurrencyTBody } from 'Components/CurrencyTBody'

import { getCurrency } from 'Services/getCurrency'

type CurrencyOldListPropsType = {
    currentName: string
}

function CurrencyOldListComponent({ currentName }: CurrencyOldListPropsType) {
    const [currencyData, setCurrencyData] = React.useState([])
    const [currencyState, setCurrencyState] = React.useState({
        currentDate: '',
        currentURL: 'https://www.cbr-xml-daily.ru/daily_json.js',
        prevURL: '',
        count: 10,
    })
    const [currencyDataArray, setCurrencyDataArray] = React.useState([])

    const headTitles: string[] = ['Дата', 'Значение, ₽', 'Разница, %']

    React.useEffect(() => {
        getCurrency(currencyState.currentURL).then(data => {
            setCurrencyDataArray(Object.entries(data.Valute))

            setCurrencyState(prevState => {
                return { ...prevState, prevURL: data.PreviousURL, currentDate: data.Date }
            })
        })
    }, [currencyState.currentURL, currentName])

    React.useEffect(() => {
        if (currencyDataArray.length > 0 && currencyState.count > 0) {
            setCurrencyData(prevState => {
                const obj = currencyDataArray.find(
                    (value: [string, CurrencyDataType]) => value[1].Name === currentName,
                )[1]

                obj.Date = currencyState.currentDate

                return [...prevState, obj]
            })

            if (currencyState.prevURL) {
                setCurrencyState(prevState => {
                    return {
                        ...prevState,
                        currentURL: currencyState.prevURL,
                        count: currencyState.count - 1,
                    }
                })
            }
        }
    }, [currencyState.prevURL])

    return (
        <table className="currency">
            <CurrencyTHead titles={headTitles} />
            <CurrencyTBody valutes={currencyData} currencysCount={currencyState.count} />
        </table>
    )
}

export const CurrencyOldList = React.memo(CurrencyOldListComponent)