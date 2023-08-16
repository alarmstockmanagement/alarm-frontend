function PrimaryButton(props) {
    return (
        <button style={props.style} onClick={props.click}> {props.title} </button>
    )
}

export default PrimaryButton