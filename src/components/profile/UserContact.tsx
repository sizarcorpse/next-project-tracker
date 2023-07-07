"use client";

import Link from "next/link";
import {
  RiAtLine,
  RiBuilding2Line,
  RiLinksLine,
  RiMailOpenLine,
  RiMapPin2Line,
} from "react-icons/ri";

interface UserContactProps {
  designation?: string | null;
  company?: string | null;
  location?: string | null;
  website?: string | null;
  contact?: string | null;
}

const UserContact: React.FC<UserContactProps> = ({
  designation,
  company,
  location,
  website,
  contact,
}) => {
  const cls = `flex flex-row items-center justify-start gap-2 text-sm text-card-foreground`;
  return designation || company || location || website || contact ? (
    <div className="flex flex-col items-start justify-start gap-2">
      {company && (
        <div className={cls}>
          <RiBuilding2Line size="1rem" />
          <span>{company}</span>
        </div>
      )}
      {designation && (
        <div className={cls}>
          <RiAtLine size="1rem" />
          <span>{designation}</span>
        </div>
      )}
      {location && (
        <div className={cls}>
          <RiMapPin2Line size="1rem" />
          <span>{location}</span>
        </div>
      )}
      {contact && (
        <Link
          className={`${cls} hover:underline hover:text-accent-foreground transition-all`}
          href={`mailto:${contact}`}
        >
          <RiMailOpenLine size="1rem" />
          <span>{contact}</span>
        </Link>
      )}
      {website && (
        <Link
          href={website}
          target="_blank"
          className={`${cls} hover:underline hover:text-accent-foreground transition-all`}
        >
          <RiLinksLine size="1rem" />
          <span>{website}</span>
        </Link>
      )}
    </div>
  ) : null;
};

export default UserContact;
