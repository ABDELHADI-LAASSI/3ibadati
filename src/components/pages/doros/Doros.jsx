import React from 'react';

const Doros = () => {
  return (
    <div style={{
      marginTop: "10rem",
      position: "relative",
      paddingBottom: "56.25%", // 16:9 aspect ratio
      height: 0,
      overflow: "hidden",
    }}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/bjKTsWw0V1Q"
        
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "50%",
          border:"5px solid blue"
        }}
      />
    </div>
  );
};

export default Doros;
