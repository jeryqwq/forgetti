const App = () => {
  function test(){
    let a = 10;
    function b () {
      let b = 20;
      console.log(b)
    }
    console.log(a);
  }
  return <div onClick={test}>123</div>
}
