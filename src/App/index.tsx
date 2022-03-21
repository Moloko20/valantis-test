import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    require('./index.scss')

    return <div></div>
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
)
