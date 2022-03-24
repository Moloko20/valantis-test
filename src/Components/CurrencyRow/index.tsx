import React from 'react'

type CurrencyRowPropsType = {
    currency: {
        CharCode: string
        ID: string
        Name: string
        Nominal: number
        NumCode: string
        Previous: number
        Value: number
    }
}

export function CurrencyRow({ currency }: CurrencyRowPropsType) {
    require('./index.sass')

    console.log(currency)

    return (
        <tr>
            <th>{currency.CharCode}</th>
            <th>{currency.Value}</th>
            <th>{(currency.Value - currency.Previous).toFixed(3)}</th>
        </tr>
    )
}
