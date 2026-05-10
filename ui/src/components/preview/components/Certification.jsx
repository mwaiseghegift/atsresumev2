import DocumentSection from "../../ui/DocumentSection";

const Certification = ({ title, certifications }) => {

    return (
        certifications.length > 0 &&
      <DocumentSection title={title}>
        <ul className="sub-content document-list leading-relaxed">
            {certifications.map((certification, index) => (
                <li key={index}>{certification}</li>
            ))}
        </ul>
      </DocumentSection>
    );
  };

export default Certification;
