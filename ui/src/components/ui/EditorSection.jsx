import React from 'react';

const EditorSection = ({ title, description, actions, children, className = '' }) => {
  return (
    <section className={`editor-section ${className}`.trim()}>
      <div className="editor-section-header">
        <div>
          <h2 className="editor-section-title">{title}</h2>
          {description && <p className="editor-section-note">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {children}
    </section>
  );
};

export default EditorSection;
