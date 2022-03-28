import React from 'react'
import ReactDOM from 'react-dom'

import { Context } from 'Contexts/context'

import { CurrencyList } from 'Components/CurrencyList'
import { CurrencyHistory } from 'Components/CurrencyHistory'

function App() {
    const [currentCurrencyName, currentCurrencyNameSet] = React.useState('')

    require('./index.sass')

    return (
        <Context.Provider
            value={{
                setCurrentName: currentCurrencyNameSet,
            }}
        >
            <div className="wrapper">
                <div className="wrapper-container">
                    <CurrencyList />
                    <CurrencyHistory currentName={currentCurrencyName} />
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