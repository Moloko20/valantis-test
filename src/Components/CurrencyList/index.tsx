import React from 'react'

import { CurrencyTable } from 'Components/CurrencyTable'

function CurrencyListComponent() {
    require('./index.sass')

    return (
        <section className="section">
            <div className="section-header">
                <h1>Курсы валют</h1>
            </div>
            <CurrencyTable />
        </section>
    )
}

export const CurrencyList = React.memo(CurrencyListComponent)