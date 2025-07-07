import { Team } from '@/types';
import { TeamCard } from './TeamCard';

type TeamGridProps = {
  teamList: Team[];
  onSelectTeam: (team: string) => void;
};

export function TeamGrid({ teamList, onSelectTeam }: TeamGridProps) {
  return (
    <div className="flex flex-col items-center gap-5 web:gap-10 px-4">
      {Array.from({ length: Math.ceil(teamList.length / 2) }).map(
        (_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-5 web:gap-10 max-w-[22rem] web:max-w-[30rem] screen:max-w-[40rem] justify-center"
          >
            {teamList
              .slice(rowIndex * 2, rowIndex * 2 + 2)
              .map((team, index) => (
                <TeamCard
                  key={index}
                  team={team}
                  onClick={() => onSelectTeam(team.name_abbr)}
                />
              ))}
          </div>
        )
      )}
    </div>
  );
}
