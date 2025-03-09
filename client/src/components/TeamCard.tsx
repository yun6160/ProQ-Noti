type TeamCardProps = {
  names: string[];
  onClick?: () => void;
};

export function TeamCard({ names, onClick }: TeamCardProps) {
  return (
    <div
      className="flex flex-col justify-center items-center text-center w-[5rem] web:w-[6rem] screen:w-[10rem] h-[5rem] web:h-[6rem]
       screen:h-[10rem] rounded-xl shadow-bottom bg-white hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      {names.map((name, index) => (
        <span
          key={index}
          className="font-ganpan text-md web:text-lg screen:text-2xl text-primary-white
          [text-shadow:_-1px_0_#314855,0_1px_#314855,1px_0_#314855,0_-1px_#314855]"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
