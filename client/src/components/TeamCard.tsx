import { Team } from '@/types';

type TeamCardProps = {
  team: Team;
  onClick?: () => void;
};

export function TeamCard({ team, onClick }: TeamCardProps) {
  const team_name = [team.name_prefix, team.name_suffix];
  return (
    <div
      className="flex flex-col justify-center items-center text-center w-[6rem] web:w-[7rem] screen:w-[10rem] h-[6rem] web:h-[7rem]
       screen:h-[10rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      {team_name.map((value, id) => (
        <span
          key={id}
          className="font-ganpan text-md web:text-lg screen:text-2xl text-primary-navy font-bold"
        >
          {value}
        </span>
      ))}
    </div>
  );
}
