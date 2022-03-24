import React from 'react'

function CurrencyHeadComponent() {
    require('./index.sass')

    return (
        <thead className="currency-head">
            <tr>
                <th>Наименование валюты</th>
                <th>Значение, &#8381;</th>
                <th>Разница, &#37;</th>
            </tr>
        </thead>
    )
}

export const CurrencyHead = React.memo(CurrencyHeadComponent)