import React from 'react'

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ name, handleClick }) =>
    <button onClick={handleClick(name)}>{name}</button>

const Feedback = ({ buttons, handleClick }) => {
    return objectReducer(buttons, (buttons, cur) => {
        return <Button key={cur} name={cur} handleClick={handleClick} />
    })
}

const Statistic = ({ name, value }) => 
    <tr>
        <td>{name}:</td> 
        <td>{value}</td>
    </tr>

const Statistics = ({ buttons, optionals, empty }) => {
    if (empty.flag) return <p>{empty.message}</p>

    const statistics =
        [...objectReducer(buttons, (buttons, cur) => {
            return <Statistic key={cur}
                name={cur} value={buttons[cur].count} />
        }),
        ...objectReducer(optionals, (optionals, cur) => {
            return <Statistic key={cur}
                name={cur} value={optionals[cur].getValue(buttons)} />
        })]

    return <table><tbody>{statistics}</tbody></table>
}

const objectReducer = (obj, cb) => {
    return [...Object.keys(obj).reduce((acc, cur) => {
        return [...acc, cb(obj, cur)]
    }, [])]
}

export {
    Title,
    Button,
    Feedback,
    Statistics
}
