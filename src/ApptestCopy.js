const ChildComponent = ({ onClick, count }) => {
  return (
    <div>
      <h2>test</h2>
    <button onClick={onClick}>
       Click me {count}
    </button>
    </div>
  )
};

export default ChildComponent;