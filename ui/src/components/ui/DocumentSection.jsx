import React from 'react';

const DocumentSection = ({ title, editable = false, onBlur, children, className = '' }) => {
  return (
    <section className={`document-section ${className}`.trim()}>
      {editable ? (
        <h2
          className="document-section-title editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={onBlur}
        >
          {title}
        </h2>
      ) : (
        <h2 className="document-section-title">{title}</h2>
      )}
      <div className="document-section-body">{children}</div>
    </section>
  );
};

export default DocumentSection;
