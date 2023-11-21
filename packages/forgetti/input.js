function Component({a, b}) {
  const x = [];
  x.push(a);

  const y = x;
  y.push(b);
    
  return <div >{x}</div>;
}
