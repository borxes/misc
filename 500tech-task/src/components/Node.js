import React, { useState } from 'react'


export default function Node({ name, children, notifyParent, parentState, filter }) {

  //const [visible, setVisible] = useState(true);
  const [nodeChildren, setNodeChildren] = useState(children);

  const handleChildClick = (childName) => {
    const currentState = nodeChildren ? nodeChildren.some(child => child.checked === true) : parentState;
    const childrenCopy = [...nodeChildren];
    childrenCopy.forEach((child, index) => {
      if (child.name === childName) {
        const currentVal = childrenCopy[index].checked;
        childrenCopy[index].checked = !currentVal;
      }
    });
    setNodeChildren(childrenCopy);
    const newState = nodeChildren ? nodeChildren.some(child => child.checked === true) : parentState;
    if (notifyParent && newState !== currentState) {
      notifyParent(name);
    }
  }

  const handleClick = event => {
    const currentState = nodeChildren ? nodeChildren.some(child => child.checked === true) : parentState;
    if (nodeChildren) {
      setNodeChildren(nodeChildren.map(child => {
        child.checked = !currentState;
        return child;
      }));
    }
    notifyParent && notifyParent(name);
  };

  const display = filter === '' || name.includes(filter);
  const checked = parentState ? true :
    nodeChildren ? nodeChildren.some(child => child.checked === true)
      : false;

  return display
    ? (
      <div className="node">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleClick}
        />
        <span>{name}</span>
        <div className="children">
          {nodeChildren && nodeChildren.map(child =>
            <Node
              name={child.name}
              children={child.children}
              notifyParent={handleChildClick}
              key={child.name}
              isChecked={child.checked}
              filter={filter}
            />
          )}
        </div>
      </div>
    )
    : null;
}