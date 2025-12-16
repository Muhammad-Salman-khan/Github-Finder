import {
  Search,
  Clock,
  ArrowUpLeft,
  Sparkles,
  MessageCircleQuestion,
  ExternalLink,
} from "lucide-react";
const Suggestion = () => {
  return (
    <>
      {/* Dropdown Results - Static Render (Always Visible) */}
      <div className=" relative -top-3 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="max-h-400 overflow-y-auto custom-scrollbar">
          {/* Section: Suggestions */}
          <div className="px-4 py-2 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left border-b border-zinc-800/50 sticky top-0 backdrop-blur-sm">
            Suggestions
          </div>

          <div className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/30 cursor-pointer group/item">
            <Clock
              size={14}
              className="text-zinc-600 group-hover/item:text-emerald-400 shrink-0 transition-colors"
            />
            <span className="text-sm text-zinc-300 group-hover/item:text-white truncate flex-1 transition-colors">
              design system{" "}
            </span>
            <ArrowUpLeft
              size={14}
              className="text-zinc-600 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all shrink-0"
            />
          </div>

          {/* Section: Related Answers */}
          <div className="px-4 py-2 bg-zinc-900/30 text-[10px] font-bold text-zinc-500 uppercase tracking-wider text-left border-y border-zinc-800/50 sticky top-0 backdrop-blur-sm">
            Related Answers
          </div>

          <div className="flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/30 cursor-pointer group/item">
            <Sparkles size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm text-zinc-200 font-medium group-hover/item:text-white transition-colors">
                How to start a design system?
              </span>
              <span className="text-xs text-zinc-500 mt-1 line-clamp-1 group-hover/item:text-zinc-400 transition-colors">
                Start by auditing existing UI components and defining tokens for
                colors and spacing.
              </span>
            </div>
            <ExternalLink
              size={12}
              className="text-zinc-600 opacity-0 group-hover/item:opacity-100 transition-all shrink-0 mt-1"
            />
          </div>

          <div className="flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/30 cursor-pointer group/item">
            <MessageCircleQuestion
              size={16}
              className="text-blue-400 mt-0.5 shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm text-zinc-200 font-medium group-hover/item:text-white transition-colors">
                Atomic Design Methodology
              </span>
              <span className="text-xs text-zinc-500 mt-1 line-clamp-1 group-hover/item:text-zinc-400 transition-colors">
                Breaking down interfaces into atoms, molecules, organisms,
                templates, and pages.
              </span>
            </div>
            <ExternalLink
              size={12}
              className="text-zinc-600 opacity-0 group-hover/item:opacity-100 transition-all shrink-0 mt-1"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestion;
