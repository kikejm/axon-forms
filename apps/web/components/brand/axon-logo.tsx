import { PRODUCT_NAME } from '@/lib/product-name';

/**
 * Logo de AxonForm (docs/axon/MARCA.md), al estilo de AxonSynapse: el nombre en
 * Alan Sans 800 con un punto del color de acento detrás, y un icono propio
 * sobre una baldosa oscura para el favicon y la barra lateral plegada. El
 * icono es el mismo dibujo que `app/icon.svg`.
 */
export function AxonWordmark() {
  return (
    <span className="flex min-w-0 items-center select-none">
      <span
        className="truncate text-foreground"
        style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1 }}
      >
        {PRODUCT_NAME}
      </span>
      <span
        aria-hidden
        className="shrink-0 rounded-full"
        style={{ width: 6, height: 6, marginLeft: 3, marginTop: 3, background: 'var(--signal)' }}
      />
    </span>
  );
}

/** El dibujo del icono, en el color que se le pase. */
export function AxonGlyph({ size, color = 'currentColor' }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2.5" stroke={color} strokeWidth="2" fill="none" />
      <rect x="8" y="6.75" width="3" height="3" rx="0.8" fill={color} />
      <path d="M13 8.25h3M8 12.5h8M8 16.5h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** El icono sobre su baldosa oscura, como el favicon. */
export function AxonIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#1a1a1c" />
      <g transform="translate(3 3) scale(0.75)">
        <rect x="5" y="3" width="14" height="18" rx="2.5" stroke="#F3DE2C" strokeWidth="2" fill="none" />
        <rect x="8" y="6.75" width="3" height="3" rx="0.8" fill="#F3DE2C" />
        <path d="M13 8.25h3M8 12.5h8M8 16.5h5" stroke="#F3DE2C" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
