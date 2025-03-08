type TeamCardProps = {
  names: string[];
  onClick?: () => void;
};

export function TeamCard({ names, onClick }: TeamCardProps) {
  return (
    <div
      className="flex flex-col justify-center items-center text-center w-[7rem] web:w-[10rem] h-[7rem] web:h-[10rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
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
