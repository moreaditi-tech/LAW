interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, center = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start'}`}>
      <h2 className="font-heading text-4xl md:text-5xl text-white tracking-tight mb-4">
        {title}
      </h2>
      <div className="h-1 w-24 bg-[#8B2232] mb-6"></div>
      {subtitle && (
        <p className="font-body text-lg text-white/60 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
