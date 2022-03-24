import React from 'react'

import { CurrencyHead } from 'Components/CurrencyHead'
import { CurrencyBody } from 'Components/CurrencyBody'

export function CurrencyList() {
    require('./index.sass')

    return (
        <table className="currency">
            <CurrencyHead />
            <CurrencyBody />
        </table>
    )
}
