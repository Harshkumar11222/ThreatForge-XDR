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
    <div className="rounded-2xl border border-slate-800 bg-[#111827]/80 p-6 hover:border-cyan-500 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {question}
        </h3>

        <ChevronDown className="text-cyan-400" />
      </div>

      <p className="mt-4 text-slate-400 leading-7">
        {answer}
      </p>
    </div>
  );
}