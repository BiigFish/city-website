import React from "react";
import ChildComponent from './ApptestCopy';



const { useState } = React;

function PageComponent() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1)
  }


  return (
    <div className="App">
      <ChildComponent onClick={increment} count={count} />         
      <h2>count {count}</h2>
      (count should be updated from child)
    </div>
  );
}

export default PageComponent