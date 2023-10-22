export default function Button(props: any) {
    return (
        <button onClick={props.onClick}>{props.label}</button>
    )
}
