import React from "react";
import Icon from "src/assets/Icon";
import InitialLayout from "src/components/layout/InitialLayout";
import Layout from "src/utils/layout/Layout";

const contactData = [
  {
    url: "https://instagram.com/km_prnanda",
    icon: Icon.Instagram,
  },
  {
    url: "https://www.linkedin.com/in/hare-prananda-178379212/",
    icon: Icon.Linkedin,
  },
  {
    url: "https://wa.me/6281338638742",
    icon: Icon.Whatsapp,
  },
  {
    url: "https://www.facebook.com/komang.hareprananda/",
    icon: Icon.Facebook,
  },
];

const Contact: React.FC = () => {
  const clickContact = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex">
      <h1 className="text-5xl md:text-7xl text-primary font-bold mt-9">
        contact
      </h1>
      <div
        className="fixed grid place-items-center w-screen h-screen top-0 left-0 px-6"
        style={{ zIndex: -1 }}
      >
        <div className="grid grid-cols-4 gap-6 sm:gap-14 md:gap-20">
          {contactData.map((Contact) => (
            <div
              key={Contact.url}
              className="cursor-pointer"
              onClick={() => clickContact(Contact.url)}
            >
              <Contact.icon className="contact__layout-icon" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Contact;
Layout(Contact, InitialLayout);
