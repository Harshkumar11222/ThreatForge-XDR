import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({
  question,
  answer,
}: FAQItemProps) {
  return (
    <div
      className="
        group rounded-2xl
        border border-cyan-300/10
        bg-[#113333]
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-teal-300/30
        hover:bg-[#123a38]
        hover:shadow-lg
        hover:shadow-teal-400/5
      "
    >
      {/* Question */}
      <div className="flex items-center justify-between gap-6">

        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-teal-100">
          {question}
        </h3>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 transition-all duration-300 group-hover:bg-teal-400/15">
          <ChevronDown
            size={20}
            className="text-teal-300 transition-transform duration-300 group-hover:translate-y-0.5"
          />
        </div>

      </div>

      {/* Answer */}
      <p className="mt-4 leading-7 text-slate-400">
        {answer}
      </p>
    </div>
  );
}