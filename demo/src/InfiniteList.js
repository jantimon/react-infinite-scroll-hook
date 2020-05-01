import React, { useState } from 'react';
import { useInfiniteScroll } from '../../src';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { INFINITE_SCROLL_DIRECTIONS } from '../../src/useInfiniteScroll';

const List = styled.ul`
  list-style: none;
  font-size: 16px;
  margin: 0;
  padding: 6px;
`;

const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`;

const Loading = () => {
  return <ListItem>Loading...</ListItem>;
};

const ARRAY_SIZE = 20;
const RESPONSE_TIME = 1000;

function loadItems(prevArray = [], startCursor = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      let newArray = prevArray;

      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          value: `This is item ${i}`,
        };
        newArray = [...newArray, newItem];
      }

      resolve(newArray);
    }, RESPONSE_TIME);
  });
}

function InfiniteList({ scrollContainer, direction }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  function handleLoadMore() {
    setLoading(true);
    loadItems(items, items.length).then(newArray => {
      setLoading(false);
      setItems(newArray);
    });
  }

  const infiniteRef = useInfiniteScroll({
    threshold: 600,
    loading,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: true,
    onLoadMore: handleLoadMore,
    scrollContainer,
    direction,
  });

  return (
    <List ref={infiniteRef}>
      {direction === INFINITE_SCROLL_DIRECTIONS.toTop && loading && <Loading />}
      {items
        .sort((a, b) =>
          direction === INFINITE_SCROLL_DIRECTIONS.toTop
            ? b.key - a.key
            : a.key - b.key,
        )
        .map(item => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
      {direction !== INFINITE_SCROLL_DIRECTIONS.toTop && loading && <Loading />}
    </List>
  );
}

InfiniteList.propTypes = {
  scrollContainer: PropTypes.oneOf(['window', 'parent']),
  direction: PropTypes.oneOf(Object.values(INFINITE_SCROLL_DIRECTIONS)),
};

export default InfiniteList;
