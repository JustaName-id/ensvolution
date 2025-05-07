
export interface BaseIconProps {
    letter: string
}


export const BaseIcon: React.FC<BaseIconProps> = ({letter}) => {
    return (
        <div
            className="w-5 h-5 flex justify-center items-center rounded-full text-sm font-bold uppercase">
            {letter}
        </div>
    );
};