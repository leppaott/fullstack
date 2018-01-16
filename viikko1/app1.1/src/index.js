import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return <h1>{props.title}</h1>
}

const Osa = (props) => {
    return <p>{props.part} {props.taskcount}</p>
}

const Sisalto = (props) => {
    return props.parts.reduce((acc, cur) => {
        return [...acc,
            <Osa part={cur.nimi} taskcount={cur.tehtavia} />
        ]
    }, [])
}

const Yhteensa = (props) => {
    return props.parts.reduce((acc, cur) => acc + cur.tehtavia, 0)
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
            <Otsikko title={kurssi.nimi} />
            <Sisalto parts={kurssi.osat} />
            <Yhteensa parts={kurssi.osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
