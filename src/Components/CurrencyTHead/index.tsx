import React from 'react'

type CurrencyHeadPropsType = {
    titles: string[]
}

function CurrencyTHeadComponent({ titles }: CurrencyHeadPropsType) {
    require('./index.sass')

    return (
        <thead className="currency-head">
            <tr>
                {titles.map((title, index) => (
                    <th key={index}>{title}</th>
                ))}
            </tr>
        </thead>
    )
}

export const CurrencyTHead = React.memo(CurrencyTHeadComponent)