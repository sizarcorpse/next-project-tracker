// import { UserGender, UserRoleBadge, UserSocials } from "@/components/profile";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";

// const TeamHoverCard = ({ item, open }: any) => {
//   const {
//     username,
//     image,
//     role,
//     profile: {
//       designation,
//       company,
//       facebook,
//       twitter,
//       instagram,
//       linkedin,
//       github,
//       gender,
//     },
//   } = item;

//   const avatarSrc = image || "/assets/images/default-avatar.jpeg";

//   return (
//     <HoverCard open={open}>
//       <HoverCardTrigger asChild>
//         <Avatar className="cursor-pointer">
//           <AvatarImage src={avatarSrc} />
//           <AvatarFallback />
//         </Avatar>
//       </HoverCardTrigger>
//       <HoverCardContent className="w-80">
//         <div className="flex justify-start space-x-4">
//           <Avatar>
//             <AvatarImage src={avatarSrc} />
//           </Avatar>
//           <div className="space-y-1">
//             <h4 className="text-base font-normal text-popover-foreground inline-flex gap-4 items-center">
//               <span className="inline-flex gap-1 items-center">
//                 {username} {gender && <UserGender gender={gender} />}
//               </span>
//               {role && <UserRoleBadge role={role} variant="secondary" />}
//             </h4>
//             {designation && company ? (
//               <p className="text-sm">
//                 {designation} at @{company}.
//               </p>
//             ) : (
//               <p className="text-sm text-muted-foreground">
//                 To the edge of the universe.
//               </p>
//             )}
//             <div className="flex items-start justify-start pt-2">
//               <UserSocials
//                 facebook={facebook}
//                 twitter={twitter}
//                 instagram={instagram}
//                 linkedin={linkedin}
//                 github={github}
//                 variant="ghost"
//                 size="sm"
//               />
//             </div>
//           </div>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   );
// };

// export default TeamHoverCard;

const TeamHoverCard = ({ item, open }: any) => {
  return <div>😔</div>;
};

export default TeamHoverCard;
