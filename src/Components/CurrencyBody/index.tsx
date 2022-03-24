import React from 'react'

import { CurrencyRow } from 'Components/CurrencyRow'
import { getCurrency } from 'Services/getCurrency'

export function CurrencyBody() {
    const [valutes, setValutes] = React.useState([])

    React.useEffect(() => {
        getCurrency().then(data => {
            console.log(Object.entries(data.Valute))

            setValutes(Object.entries(data.Valute))
        })
    }, [])

    require('./index.sass')

    return (
        <tbody>
            {valutes.map(value => (
                <CurrencyRow key={value[1].ID} currency={value[1]} />
            ))}
        </tbody>
    )
}
