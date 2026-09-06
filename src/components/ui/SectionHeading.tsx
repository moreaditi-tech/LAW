interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, center = false, light = false }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start'}`}>
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mb-4">
        {title}
      </h2>
      <div className="h-1 w-24 bg-[#0B2A52] mb-6"></div>
      {subtitle && (
        <p className={`font-body text-sm sm:text-base md:text-lg text-white/60 max-w-2xl ${center ? 'text-center' : 'text-left'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
