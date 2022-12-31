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
    {reverseScroll ? <div ref={ref} style={{ height: '5px', opacity: '0' }} /> : null}
      {children}
      {reverseScroll ? null : <div ref={ref} style={{ height: '5px', opacity: '0'}} />}
    </>
  );
};

export default InfiniteScroll;
