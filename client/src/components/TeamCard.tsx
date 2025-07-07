import { Team } from '@/types';

type TeamCardProps = {
  team: Team;
  onClick?: () => void;
};

export function TeamCard({ team, onClick }: TeamCardProps) {
  const team_name = [team.name_prefix, team.name_suffix];
  return (
    <div
      className="flex flex-col justify-center items-center text-center
                 w-full aspect-square max-w-[5rem] max-h-[5rem]
                 sm:max-w-[7rem] sm:max-h-[7rem]
                 md:max-w-[8rem] md:max-h-[8rem]
                 lg:max-w-[10rem] lg:max-h-[10rem]
                 rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer p-2"
      onClick={onClick}
    >
      {team_name.map((value, id) => (
        <span
          key={id}
          className="font-ganpan text-sm sm:text-base md:text-lg text-primary-navy font-bold"
        >
          {value}
        </span>
      ))}
    </div>
  );
}
