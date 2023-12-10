// message/page.tsx

import React from 'react';

const MessagePage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <iframe
        src="Chat/index.html"
        width="100%"
        height="590px"
        style={{ border: '0', borderRadius: '10px' }}
      />
    </div>
  );
};

export default MessagePage;
