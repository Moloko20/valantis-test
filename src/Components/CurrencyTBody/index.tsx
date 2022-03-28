import React from 'react'

import { CurrencyRow, CurrencyDataType } from 'Components/CurrencyTRow'

type CurrencyBodyPropsType = {
    valutes: CurrencyDataType[]
    currencysCount: number
}

function CurrencyTBodyComponent({ valutes, currencysCount }: CurrencyBodyPropsType) {
    require('./index.sass')

    return (
        <tbody className="currency-body">
            {currencysCount === 0 ? (
                valutes.map((currencyItem, index) => {
                    return <CurrencyRow key={currencyItem.ID + index} currency={currencyItem} />
                })
            ) : (
                <tr>
                    <th>Loading...</th>
                </tr>
            )}
        </tbody>
    )
}

export const CurrencyTBody = React.memo(CurrencyTBodyComponent)