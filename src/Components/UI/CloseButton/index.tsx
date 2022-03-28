import React from 'react'

type CloseButtonPropsType = {
    clickHandler: () => void
}

function CloseButtonComponent({ clickHandler }: CloseButtonPropsType) {
    const btnClickNandler = (event: React.MouseEvent) => {
        event.preventDefault()
        clickHandler()
    }

    require('./index.sass')

    return (
        <button className="button button--close" onClick={btnClickNandler}>
            X
        </button>
    )
}

export const CloseButton = React.memo(CloseButtonComponent)