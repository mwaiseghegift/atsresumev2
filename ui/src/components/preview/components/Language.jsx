import DocumentSection from "../../ui/DocumentSection";

const Language = ({ title, languages }) => {
  return (
    languages.length > 0 && (
      <DocumentSection title={title}>
        <p className="sub-content leading-relaxed">{languages.join(", ")}</p>
      </DocumentSection>
    )
  );
};

export default Language;
