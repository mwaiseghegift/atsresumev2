import Image from "next/image";
import ContactInfo from "../components/ContactInfo";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";

const Header = ({ resumeData, icons }) => {
  return (
    <div className="f-col items-center mb-4 text-center">
      {resumeData.profilePicture.length > 0 && (
        <div className="theme-resume-avatar w-24 h-24 rounded-full overflow-hidden border-2 mb-2 exclude-print">
          <Image
            src={resumeData.profilePicture}
            alt="profile"
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />
        </div>
      )}

      <h1 className="name text-[2rem]">{resumeData.name}</h1>
      <p className="profession mb-3 text-[0.95rem] tracking-[0.12em] uppercase text-[#355261]">{resumeData.position}</p>

      <ContactInfo
        mainclass="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-2 contact text-[#4a6270]"
        linkclass="inline-flex items-center gap-1 whitespace-nowrap"
        teldata={resumeData.contactInformation}
        emaildata={resumeData.email}
        addressdata={resumeData.address}
        telicon={<MdPhone />}
        emailicon={<MdEmail />}
        addressicon={<MdLocationOn />}
      />

      <div className="flex flex-wrap justify-center gap-3 text-[#2A9D8F]">
        {resumeData.socialMedia.map((socialMedia, index) => {
          return (
            <a
              href={`http://${socialMedia.link}`}
              aria-label={socialMedia.socialMedia}
              key={index}
              title={socialMedia.socialMedia}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 social-media whitespace-nowrap document-link"
            >
              {icons.map((icon, index) => {
                if (icon.name === socialMedia.socialMedia.toLowerCase()) {
                  return <span key={index}>{icon.icon}</span>;
                }
              })}
              {socialMedia.link}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
