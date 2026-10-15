import styles from "./DeliverCarSection.module.css";

/**
 * Promo section for customers who didn't find what they wanted in stock.
 * Pass `phone` to wire up the call button; `address` is shown as a plain
 * line of text (swap the "Apmeklēt mūs" href for a maps link if you have one).
 */
export default function CustomOrderSection({
  phone = "+371 20 772 700",
  address = '"Lejas", Pelču pag., Kuldīgas novads',
}) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.title}>Auto pēc pasūtījuma</h2>
        <p className={styles.text}>
          Neatrodi meklēto? Zvani vai brauc pie mums ciemos ar savām vēlmēm, un
          mēs palīdzēsim Jums iegūt Jūsu vēlamo auto no ārzemēm.
        </p>

        <div className={styles.actions}>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className={styles.primaryButton}
          >
            Zvanīt {phone}
          </a>
          <span className={styles.address}>{address}</span>
        </div>
      </div>

      <div className={styles.artwork} aria-hidden="true">
        <svg
          viewBox="0 0 340 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="coGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--co-gold)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--co-gold)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* globe */}
          <g transform="translate(150 118)">
            <circle r="92" fill="url(#coGlow)" />
            <circle r="72" stroke="var(--co-line)" strokeWidth="1.6" />
            <ellipse
              rx="30"
              ry="72"
              stroke="var(--co-line)"
              strokeWidth="1.2"
            />
            <ellipse
              rx="58"
              ry="72"
              stroke="var(--co-line)"
              strokeWidth="1.2"
            />
            <ellipse
              rx="72"
              ry="26"
              stroke="var(--co-line)"
              strokeWidth="1.2"
            />
            <ellipse
              rx="72"
              ry="50"
              stroke="var(--co-line)"
              strokeWidth="1.2"
            />
          </g>

          {/* customs stamp badge */}
          <g transform="translate(246 18)">
            <circle
              r="26"
              stroke="var(--co-gold-deep)"
              strokeWidth="1.6"
              strokeDasharray="3 4"
            />
            <circle r="18" stroke="var(--co-gold-deep)" strokeWidth="1.2" />
            <path
              d="M-8 1 L-2 8 L9 -7"
              stroke="var(--co-gold-deep)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* flight route: abroad pin -> waypoint -> car */}
          <path
            d="M40 34C70 70 30 120 78 150C110 172 150 150 176 176"
            stroke="var(--co-ink-soft)"
            strokeWidth="2"
            strokeDasharray="1 9"
            strokeLinecap="round"
          />

          <g transform="translate(28 8)">
            <path
              d="M12 0C5.4 0 0 5.4 0 12c0 9 12 19.5 12 19.5S24 21 24 12C24 5.4 18.6 0 12 0Z"
              fill="var(--co-ink)"
            />
            <circle cx="12" cy="12" r="4.6" fill="var(--co-panel)" />
          </g>

          <circle cx="78" cy="150" r="4" fill="var(--co-gold-deep)" />

          {/* destination glow + car */}
          <circle cx="205" cy="205" r="46" fill="url(#coGlow)" />
          <g transform="translate(178 190)">
            <path
              d="M4 20V11.5C4 9.6 5.6 8 7.5 8h1.8l3-7.3C13 .3 13.6 0 14.3 0h19.4c.7 0 1.3.3 1.6 1L38 8h1.8c1.9 0 3.5 1.6 3.5 3.5V20"
              stroke="var(--co-ink)"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="var(--co-panel)"
            />
            <rect
              x="0"
              y="20"
              width="47"
              height="9"
              rx="3"
              fill="var(--co-ink)"
            />
            <circle cx="10.5" cy="30" r="5.5" fill="var(--co-ink)" />
            <circle cx="10.5" cy="30" r="2.2" fill="var(--co-panel)" />
            <circle cx="36.5" cy="30" r="5.5" fill="var(--co-ink)" />
            <circle cx="36.5" cy="30" r="2.2" fill="var(--co-panel)" />
          </g>

          {/* scattered accent dots */}
          <circle cx="288" cy="120" r="3" fill="var(--co-gold)" />
          <circle cx="60" cy="230" r="2.4" fill="var(--co-gold)" />
          <circle cx="300" cy="200" r="2" fill="var(--co-ink-soft)" />
        </svg>
      </div>
    </section>
  );
}
