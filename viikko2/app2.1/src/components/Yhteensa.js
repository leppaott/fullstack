
const Yhteensa = (props) => {
    return props.parts.reduce((acc, cur) => acc + cur.tehtavia, 0)
}

export default Yhteensa