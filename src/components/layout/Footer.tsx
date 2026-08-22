import { FIRM } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0F1B2D] py-6 w-full">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm font-body tracking-wider">
          &copy; {FIRM?.name || 'Prime Law Bharat'} {currentYear}
        </p>
      </div>
    </footer>
  );
}
