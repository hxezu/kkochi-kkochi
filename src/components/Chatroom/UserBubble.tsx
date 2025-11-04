interface UserBubbleProps {
  text: string;
}

export default function UserBubble({ text }: UserBubbleProps) {
  return (
    <div className="flex justify-end ">
      <div className="bg-(--color-primary-200) text-white text-[13px] md:text-[15px] p-2 md:p-4 rounded-b-xl rounded-tl-xl max-w-[70%] lg:max-w-[540px]">
        {text}
      </div>
    </div>
  );
}
