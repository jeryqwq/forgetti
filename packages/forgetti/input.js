const App = ({a}) => {
  const [done, setDone] = useState(false);
  console.log(done, setDone);
  return <div onClick={() => setDone(true)}>{a} - {done ? 'finish' : 'doing'}</div>
}
