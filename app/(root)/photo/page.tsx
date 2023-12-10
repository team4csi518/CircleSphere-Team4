// photo/page.tsx

import React from 'react';

const PhotoPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <iframe
        src="photo/index.html"
        width="100%"
        height="590px"
        style={{ border: '0', borderRadius: '10px' }}
      />
    </div>
  );
};

export default PhotoPage;
