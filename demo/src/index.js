import React, { useState } from 'react';
import { render } from 'react-dom';
import InfiniteList from './InfiniteList';
import styled from 'styled-components';
import { INFINITE_SCROLL_DIRECTIONS } from '../../src/useInfiniteScroll';

const ListContainer = styled.div`
  max-height: ${props => (props.scrollable ? '600px' : 'auto')};
  max-width: ${props => (props.scrollable ? '600px' : 'auto')};
  overflow: auto;
  background-color: #e4e4e4;
`;

function Demo() {
  const [scrollParent, setScrollParent] = useState(false);
  const [direction, setDirection] = useState();

  function handleScrollParentChange(e) {
    const checked = e.target.checked;
    setScrollParent(checked);
  }

  function handleDirectionChange(e) {
    const checked = e.target.checked;
    setDirection(
      checked
        ? INFINITE_SCROLL_DIRECTIONS.toTop
        : INFINITE_SCROLL_DIRECTIONS.toBottom,
    );
  }

  return (
    <React.Fragment>
      <input
        type="checkbox"
        checked={scrollParent}
        onChange={handleScrollParentChange}
      />
      Scrollable Parent
      <input
        type="checkbox"
        checked={direction === INFINITE_SCROLL_DIRECTIONS.toTop}
        onChange={handleDirectionChange}
      />
      Scroll to top
      <ListContainer scrollable={scrollParent}>
        <InfiniteList
          scrollContainer={scrollParent ? 'parent' : 'window'}
          direction={direction}
        />
      </ListContainer>
    </React.Fragment>
  );
}

render(<Demo />, document.querySelector('#demo'));
