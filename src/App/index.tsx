import React from 'react'
import ReactDOM from 'react-dom'

import { Context } from 'Contexts/context'

import { CurrencyList } from 'Components/CurrencyList'
import { CurrencyPopup } from 'Components/CurrencyPopup'

function App() {
    const [currentCurrencyName, setCurrentCurrencyName] = React.useState('')

    require('./index.sass')

    return (
        <Context.Provider
            value={{
                setCurrentName: setCurrentCurrencyName,
            }}
        >
            <div className="wrapper">
                <div className="wrapper-container">
                    <CurrencyList />
                    <CurrencyPopup currentName={currentCurrencyName} />
                </div>

                <a href="https://www.cbr-xml-daily.ru/">Виджет курсов валют</a>
            </div>
        </Context.Provider>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)
