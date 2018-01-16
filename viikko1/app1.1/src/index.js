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
        const [part, taskcount] = cur;
        return [...acc, 
            <Osa part={part} taskcount={taskcount}/>
    ]}, [])
}

const Yhteensa = (props) => {
    return props.taskcounts.reduce((acc, cur) => acc + cur)
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko title={kurssi} />
            <Sisalto parts={[[osa1, tehtavia1], [osa2, tehtavia2], [osa3, tehtavia3]]}/>
            <Yhteensa taskcounts={[tehtavia1, tehtavia2, tehtavia3]}/>
      </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
