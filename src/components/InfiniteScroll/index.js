import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const InfiniteScroll = ({ children, onLoadMore, hasMore }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      onLoadMore();
    }
  }, [inView, onLoadMore, hasMore]);

  return (
    <>
      {children}
      <div ref={ref} style={{ height: '5px' }} />
    </>
  );
};

export default InfiniteScroll;
