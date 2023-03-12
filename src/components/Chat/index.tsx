import { useLazyQuery, useQuery } from '@apollo/client';
import { ChatAltIcon, PaperAirplaneIcon } from '@heroicons/react/outline';
import { Button, Drawer, Input, Tooltip } from '@mantine/core';
import ProfilePicture from 'components/ProfilePicture';
import { ChatContext } from 'contexts';
import { GET_ROOM_FOR_MEMBER_IDS } from 'graphql/queries';
import { useAuth } from 'hooks';
import { useContext, useEffect, useRef, useState } from 'react';
import { LIMIT } from 'utils/constants';
import { classNames } from 'utils/helpers';

const ChatPage = ({ job }) => {
  const { _id, creator, assignee } = job;
  const { socketClient, isConnected } = useContext(ChatContext);
  const { user } = useAuth();
  const ref = useRef(null);

  const [open, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const [getRoom, {data, fetchMore}] = useLazyQuery(GET_ROOM_FOR_MEMBER_IDS, {
    onCompleted: (data) => {
      console.log(data, 'DATA')
      setMessages([
        ...messages,
       ...(data?.getRoomForMemberIds ?  data.getRoomForMemberIds?.messages?.map((msg) => {
        return {
          creator: msg.createdBy,
          message: msg.text,
          timestamp: msg.createdAt,
        };
      }) : [])
      ])
    }
  });

  useEffect(() => {
    if (open) {
      try {
        getRoom({
          variables: {
            senderId: user._id,
            receiverId:
              user._id === creator.userId ? assignee.userId : creator.userId,
            limit: 500,
            offset: 0,
          },
        });
      } catch (error) {
        console.log(error, 'err');
      }
    }
  }, [open]);

  const sendMessage = () => {
    const newMessage = {
      senderId: user._id,
      receiverId:
        user._id === creator.userId ? assignee.userId : creator.userId,
      text: ref.current.value,
      roomId: data?.getRoomForMemberIds?._id
    };
    socketClient.emit('sendMessage', newMessage);
    ref.current.value = '';
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    if(e.key === 'Enter' && ref.current.value) {
      console.log(ref.current.value, 'val')
      sendMessage();
    }
  }
  
  useEffect(() => {
    if(data?.getRoomForMemberIds?._id) {
      document.addEventListener('keydown', handleKeydown)
    }
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [data?.getRoomForMemberIds?._id, socketClient])

  useEffect(() => {
    socketClient?.on('getMessage', (socketData) => {
      if(socketData.roomId !== data?.getRoomForMemberIds?._id) {
        return
      }
      if(open) {
        const messageClone = [...messages];
        messageClone.unshift({
          creator: socketData.createdBy,
          message: socketData.text,
          timestamp: socketData.timestamp
        });
        setMessages(messageClone);
      }
    });
  }, [socketClient, messages]);


  const toggleDrawer = () => setIsOpen((prev) => !prev);
  return (
    <>
        <button
          onClick={toggleDrawer}
        className="bg-blue-400 w-full rounded-full py-2 px-4 main-gradient-btn flex justify-center items-center gap-4"
        >
          <ChatAltIcon className="h-5 w-5 text-white" aria-hidden="true" />
          Open chat</button>
      <Drawer
        overlayOpacity={0.55}
        position='right'
        overlayBlur={3}
        opened={open}
        onClose={toggleDrawer}
      >
        <div>
          <div className='flex flex-col max-h-screen'>
            <div className='flex justify-center items-center border-b flex flex-col gap-2'>
              <h1 className='text-sm font-semibold text-gray-900 py-4'>
                Chat with {user._id === creator.userId ? assignee.firstName : creator.firstName}
              </h1>
              <div className='flex gap-2 relative pb-4'>
                {[creator, assignee].map((user, idx) => (
                  <ProfilePicture
                    size='h-6 w-6'
                    key={idx}
                    className={`${idx === 0 ? '' : 'absolute left-3/4'}`}
                    // className={`${idx === 0 ? 'mr-2' : ""}`
                    src={user?.profilePicture}
                  />
                ))}
              </div>
            </div>
            <div className='flex flex-col-reverse overflow-auto'>
              <div className='flex flex-col gap-4 pt-8 pb-24 px-6'>
                <div className='flex gap-4 flex-col-reverse' style={{minHeight: '80vh'}}>

                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={classNames(
                        message.creator === user._id
                          ? 'flex bg-blue-600 self-end text-white'
                          : 'flex self-start bg-gray-200',
                        'rounded-lg px-4 py-2 text-sm w-fit max-w-1/2'
                      )}
                    >
                      {console.log(message, 'msg')}
                      {message.message}
                    </div>
                  ))}
                </div>
                <div className='flex justify-between items-end gap-2 border-t border-gray-300 px-4 py-2'>
                  <textarea
                    className='w-full outline-none border-none focus:ring-0'
                    placeholder='Type your message here...'
                    ref={ref}
                  />
                  <button
                    type='button'
                    onClick={sendMessage}
                    className='border-0 hover:bg-blue-600 cursor-pointer bg-blue-500 rounded-full text-white p-1 px-1 flex items-center justify-center'
                  >
                    <PaperAirplaneIcon className='h-5 w-5 rotate-90 ' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ChatPage;
