import { TeamCard } from './TeamCard';

const teams = [
  ['젠지', '이스포츠'],
  ['한화생명', '이스포츠'],
  ['디플러스', '기아'],
  ['T1'],
  ['BNK', '피어엑스'],
  ['DRX'],
  ['OK저축은행', '브리온'],
  ['농심', '레드포스'],
  ['DN', '프릭스'],
  ['KT', '롤스터']
];

type TeamGridProps = {
  onSelectTeam: (team: string[]) => void; // 팀 선택 이벤트 함수 Prop 추가
};

export function TeamGrid({ onSelectTeam }: TeamGridProps) {
  return (
    <div className="flex flex-col items-center gap-5 web:gap-10 bg-[#5CC3E8] pt-24 web:pt-36 px-15 h-screen">
      {Array.from({ length: Math.ceil(teams.length / 2) }).map(
        (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-5 web:gap-10">
            {teams.slice(rowIndex * 2, rowIndex * 2 + 2).map((team, index) => (
              <TeamCard
                key={index}
                names={team}
                onClick={() => onSelectTeam(team)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}
