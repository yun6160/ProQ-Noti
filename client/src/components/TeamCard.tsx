type TeamCardProps = {
  names: string[];
  onClick?: () => void; // 클릭 이벤트 Prop 추가
};

export function TeamCard({ names, onClick }: TeamCardProps) {
  return (
    <div
      className="flex flex-col justify-center items-center text-center w-[7rem] web:w-[10rem] h-[7rem] web:h-[10rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer"
      onClick={onClick} // 카드 클릭 시 부모에서 내려준 함수 실행
    >
      {names.map((name, index) => (
        <span
          key={index}
          className="font-ganpan text-lg web:text-2xl text-white [text-shadow:_-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
