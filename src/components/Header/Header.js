import React, { useState } from 'react';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };
  return <>Aman</>;
  // return (
  //   <div className='bg-success text-white p-1'>
  //     <h6 className='text-center'>
  //       Unique site visits: {visitorCount}{' '}
  //       <span
  //         className='info-icon'
  //         onMouseEnter={handleMouseEnter}
  //         onMouseLeave={handleMouseLeave}
  //       >
  //         ⓘ
  //       </span>
  //     </h6>
  //     {showInfo && (
  //       <div className='info-bar text-center'>
  //         This website uses cookies. Only user visits are tracked and no
  //         personal information is used or stored.
  //         <br />
  //         Visit counts are maintained using Redis as cache and database on an
  //         Amazon EC2 host.
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Header;
