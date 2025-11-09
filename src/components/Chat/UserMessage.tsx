interface UserMessageProps {
  text: string;
}

export default function UserMessage({ text }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="bg-[var(--color-primary-200)] text-white text-[13px] md:text-[15px] p-2 md:p-4 rounded-b-xl rounded-tl-xl max-w-[70%] lg:max-w-[540px] break-words">
        {text}
      </div>
    </div>
  );
}
