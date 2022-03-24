import React from 'react'
import ReactDOM from 'react-dom'

import { CurrencyList } from 'Components/CurrencyList'

function App() {
    require('./index.sass')

    return (
        <div className="wrapper">
            <h1>Курсы валют</h1>
            <CurrencyList />
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)
