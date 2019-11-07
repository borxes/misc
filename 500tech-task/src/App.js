import React, { useState } from 'react';
import Node from './components/Node';
import list from './list';

// result:

// filter not implemented
// checkbox works almost completely

const App = () => {

  const [filter, setFilter] = useState('');

  return (
    <React.Fragment>
      <input placeholder="filter" type="text" value={filter} onChange={
        (event) => { setFilter(event.target.value); }
      } />
      {list.map(elem =>
        <Node
          name={elem.name}
          children={elem.children}
          key={elem.name}
          isChecked={false}
          filter={filter}
        />
      )}

    </React.Fragment>

  );

};


export default App;
