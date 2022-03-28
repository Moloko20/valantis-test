import React from 'react'

import { CurrencyTHead } from 'Components/CurrencyTHead'
import { CurrencyTBody } from 'Components/CurrencyTBody'

import { getCurrency } from 'Services/getCurrency'

function CurrencyTableComponent() {
    const headTitles: string[] = ['Наименование валюты', 'Значение, ₽', 'Разница, %']

    const [valutes, setValutes] = React.useState([])

    React.useEffect(() => {
        getCurrency().then(data => {
            const arr = Object.entries(data.Valute).map(value => value[1])

            setValutes(arr)
        })
    }, [])

    require('./index.sass')

    return (
        <table className="currency">
            <CurrencyTHead titles={headTitles} />
            <CurrencyTBody valutes={valutes} currencysCount={0} />
        </table>
    )
}

export const CurrencyTable = React.memo(CurrencyTableComponent)
