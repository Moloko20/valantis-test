import React from 'react'

import { CurrencyTHead } from 'Components/CurrencyTHead'
import { CurrencyTBody } from 'Components/CurrencyTBody'

import { getCurrency } from 'Services/getCurrency'

function CurrencyListComponent() {
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
        <section className="section">
            <div className="section-header">
                <h1>Курсы валют</h1>
            </div>
            <table className="currency">
                <CurrencyTHead titles={headTitles} />
                <CurrencyTBody valutes={valutes} currencysCount={0} />
            </table>
        </section>
    )
}

export const CurrencyList = React.memo(CurrencyListComponent)