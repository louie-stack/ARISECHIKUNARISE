// Rolling "ARISE CHIKUN ARISE" band — transition strip between dark sections.
// Black bg, red top/bottom borders, green spray-paint Ł separator, scrolls via .animate-marquee.
export default function AriseMarquee() {
  return (
    <div className="bg-ink overflow-hidden border-y-4 border-blood">
      <div className="flex animate-marquee whitespace-nowrap py-3 pause-on-hover">
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <span
              key={i}
              className="font-black text-bone text-5xl md:text-7xl tracking-tight px-6 flex items-center gap-6 shrink-0"
            >
              ARISE CHIKUN ARISE{" "}
              <span className="spray-tag text-4xl md:text-6xl">Ł</span>
            </span>
          ))}
      </div>
    </div>
  );
}
