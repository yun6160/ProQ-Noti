import { Team } from '@/types';
import { TeamCard } from './TeamCard';

type TeamGridProps = {
  teamList: Team[];
  onSelectTeam: (team: string) => void;
};

export function TeamGrid({ teamList, onSelectTeam }: TeamGridProps) {
  return (
    <div
      className="grid grid-cols-2 grid-rows-5 gap-3 p-5 h-full place-items-center
                 sm:gap-4 sm:p-4 md:gap-5 md:p-5 lg:gap-6 lg:p-6"
    >
      {teamList.map((team, index) => (
        // 각 TeamCard는 그리드 아이템이 됨
        <TeamCard
          key={index} // 각 아이템의 고유한 key
          team={team}
          onClick={() => onSelectTeam(team.name_abbr)}
        />
      ))}
    </div>
  );
}
