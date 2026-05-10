import React from 'react';

const A4PageWrapper = ({children}) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div id="resume-pdf-content" className="document-shell" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default A4PageWrapper;
