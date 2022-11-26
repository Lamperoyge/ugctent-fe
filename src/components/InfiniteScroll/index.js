import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const InfiniteScroll = ({ children, onLoadMore, hasMore, reverseScroll }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      onLoadMore();
    }
  }, [inView, onLoadMore, hasMore]);

  return (
    <>
    {reverseScroll ? <div ref={ref} style={{ height: '5px' }} /> : null}
      {children}
      {reverseScroll ? null : <div ref={ref} style={{ height: '5px' }} />}
    </>
  );
};

export default InfiniteScroll;
