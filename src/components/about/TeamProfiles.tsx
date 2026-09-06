'use client';

import { TEAM } from '@/lib/constants';
import SectionHeading from '@/components/ui/SectionHeading';

export default function TeamProfiles() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#0F1B2D]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Meet Our Team" center />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {TEAM.map((member, index) => (
            <div 
              key={index} 
              className="bg-white/5 border border-white/10 rounded-sm p-8 md:p-10 flex flex-col justify-between hover:border-[#0B2A52]/50 hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                <div className="mb-6">
                  <h3 className="font-heading text-3xl text-white mb-2">{member.name}</h3>
                  <p className="font-body text-[#C9A45C] font-semibold tracking-wide text-base">{member.role}</p>
                  
                  {member.experience && (
                    <p className="font-body text-sm text-white/70 mt-2 font-medium">{member.experience}</p>
                  )}
                  {member.courts && (
                    <p className="font-body text-xs sm:text-sm text-white/50 mt-1 italic leading-relaxed text-justify">{member.courts}</p>
                  )}
                </div>
                
                <div className="border-t border-white/10 pt-6 mb-8">
                  <p className="font-body text-white/75 text-sm sm:text-base leading-relaxed whitespace-pre-line text-justify">
                    {member.bio}
                  </p>
                </div>
              </div>
              
              {member.expertise && member.expertise.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-heading text-sm text-white/90 uppercase tracking-widest mb-4">Areas of Expertise</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {member.expertise.map((item, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] mt-1.5 mr-2.5 flex-shrink-0" />
                        <span className="font-body text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
