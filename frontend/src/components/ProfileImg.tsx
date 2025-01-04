import React from "react";
import { cn } from "../lib/utils.ts";

interface ProfileImgProps {
  profile_url: string;
  full_name: string;
  containerClassName?: string;
}

const ProfileImg: React.FC<ProfileImgProps> = ({
  profile_url,
  full_name,
  containerClassName,
}) => {
  return (
    <span
      className={cn(
        "mx-auto block h-8 w-8 overflow-hidden rounded-full",
        containerClassName,
      )}
    >
      <img
        src={profile_url}
        className={"size-full object-cover"}
        alt={full_name}
        loading={"lazy"}
      />
    </span>
  );
};
export default ProfileImg;
