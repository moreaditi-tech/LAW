'use client';

interface InfiniteMarqueeProps {
  items: string[];
  className?: string;
}

export default function InfiniteMarquee({ items, className = '' }: InfiniteMarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-white/10 ${className}`}>
      <div className="marquee-track flex w-max gap-12 py-4">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-body text-xs uppercase tracking-[0.28em] text-white/55 whitespace-nowrap"
          >
            <span className="text-[#C9A45C] mr-12">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
