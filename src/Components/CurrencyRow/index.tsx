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
            <td>{currency.CharCode}</td>
            <td>{currency.Value}</td>
            <td>{(currency.Value - currency.Previous).toFixed(3)}</td>
        </tr>
    )
}
