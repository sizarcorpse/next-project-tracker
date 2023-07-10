import { RiGenderlessLine, RiMenLine, RiWomenLine } from "react-icons/ri";

interface UserGenderProps {
  gender: "Male" | "Female" | "Other" | null;
}

const UserGender: React.FC<UserGenderProps> = ({ gender }) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      {gender === "Male" && <RiMenLine size="1rem" />}
      {gender === "Female" && <RiWomenLine size="1rem" />}
      {gender === "Other" && <RiGenderlessLine size="1rem" />}
    </div>
  );
};

export default UserGender;
