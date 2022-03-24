import React from 'react'

import { CurrencyHead } from 'Components/CurrencyHead'
import { CurrencyBody } from 'Components/CurrencyBody'

function CurrencyListComponent() {
    require('./index.sass')

    return (
        <table className="currency">
            <CurrencyHead />
            <CurrencyBody />
        </table>
    )
}

export const CurrencyList = React.memo(CurrencyListComponent)