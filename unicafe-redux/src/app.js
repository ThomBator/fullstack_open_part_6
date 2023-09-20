import React from "react";

import { useSelector, useDispatch } from "react-redux";

const goodAction = { type: "GOOD" };
const okAction = { type: "OK" };
const badAction = { type: "BAD" };
const zeroAction = { type: "ZERO" };

const App = () => {
  //dispatch is used to update the state heled in the store passed to the Provider component in index.js
  //useSelector
  const dispatch = useDispatch();
  const values = useSelector((state) => state);

  return (
    <div>
      <button type="button" onClick={() => dispatch(goodAction)}>
        good
      </button>
      <button type="button" onClick={() => dispatch(okAction)}>
        ok
      </button>
      <button type="button" onClick={() => dispatch(badAction)}>
        bad
      </button>
      <button type="button" onClick={() => dispatch(zeroAction)}>
        reset stats
      </button>
      <div>good {values.good}</div>
      <div>ok {values.ok}</div>
      <div>bad {values.bad}</div>
    </div>
  );
};

export default App;
