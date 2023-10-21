function Example(props) {
  const a = props.b + 3;
  const b = function () {
    console.log(a)
  }
  return <div>{props.a}: {a}</div>
}
