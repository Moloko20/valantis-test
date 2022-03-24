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

    let different: number | string = +(
        (currency.Value / 100) *
        (currency.Value - currency.Previous)
    ).toFixed(1)

    let differentClassName: string = ''

    if (different > 0) {
        differentClassName = 'different--up'
    } else if (different < 0) {
        differentClassName = 'different--down'
        different = Math.abs(different)
    }

    if (String(different).length < 2) {
        different = different + '.0'
    }

    return (
        <tr>
            <td>{currency.CharCode}</td>
            <td>{currency.Value}</td>
            <td className={differentClassName}>{different}</td>
        </tr>
    )
}
