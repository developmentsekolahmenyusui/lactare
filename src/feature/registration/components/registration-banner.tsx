import { CheckIcon, Sparkles } from 'lucide-react';

const highlights = [
  'Pendampingan konselor laktasi bersertifikat',
  'Materi persiapan menyusui pra & pasca persalinan',
  'Akses komunitas dan sesi tanya jawab eksklusif',
];

const details = [
  { label: 'Batch', value: '18' },
  { label: 'Format', value: 'Hybrid' },
  { label: 'Kuota', value: 'Terbatas' },
];

export function RegistrationBanner() {
  return (
    <section className='from-primary via-accent-foreground to-secondary relative overflow-hidden bg-linear-to-br text-white'>
      <div
        className='absolute inset-0 opacity-30'
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.25), transparent 40%)',
        }}
        aria-hidden='true'
      />

      <div className='relative z-10 px-6 py-10 sm:px-10'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <div className='inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-xs tracking-[0.3em] text-white/80 uppercase'>
            <Sparkles className='h-3.5 w-3.5' />
            <span>Batch 18 Dibuka</span>
          </div>

          <div className='flex flex-col gap-3 text-pretty'>
            <h1 className='font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[46px]'>
              Sekolah Menyusui
            </h1>
            <p className='text-base text-white/80 sm:text-lg'>
              Formulir pendaftaran untuk ibu yang ingin merasakan pengalaman belajar menyusui yang intim, suportif, dan
              terstruktur dari mentor profesional.
            </p>
          </div>

          <div className='grid w-full gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur sm:grid-cols-3'>
            {highlights.map((item) => (
              <div key={item} className='flex items-start gap-3 text-left'>
                <span className='mt-1 rounded-full bg-white/20 p-1'>
                  <CheckIcon className='h-4 w-4' />
                </span>
                <p className='text-sm text-white/90'>{item}</p>
              </div>
            ))}
          </div>

          <div className='flex flex-wrap items-center justify-center gap-3 text-sm text-white/70'>
            {details.map((detail) => (
              <div key={detail.label} className='rounded-full border border-white/30 px-4 py-1 backdrop-blur'>
                <span className='text-[11px] tracking-wide uppercase'>{detail.label}</span>
                <span className='ml-2 font-medium text-white'>{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
