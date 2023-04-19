import translations from "./translations";
import { FileText } from "tabler-icons-react";

export const navigation = ({ lang }) => {
  const links_1 = [
    {
      label: "Software engineer",
      link: "/generating",
      icon: <FileText />,
    },
    {
      // label: translations[lang]?.dashboard,
      label: "Marketing Assistant",
      link: "/",
      icon: <FileText />,
    },
    {
      // label: translations[lang]?.dashboard,
      label: "Sales Assistant",
      link: "/",
      icon: <FileText />,
    },
    {
      // label: translations[lang]?.dashboard,
      label: "Content Creator",
      link: "/",
      icon: <FileText />,
    },
  ];

  return links_1;
};
