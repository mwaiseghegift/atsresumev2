const Language = ({ title, languages }) => {
  return (
    languages.length > 0 && (
      <div>
        <h2 className="section-title mb-1.5 border-b-2 border-gray-300">
          {title}
        </h2>
        <p className="sub-content leading-relaxed">{languages.join(", ")}</p>
      </div>
    )
  );
};

export default Language;
