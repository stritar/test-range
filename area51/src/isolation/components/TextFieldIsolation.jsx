import { TextField } from '../../components/TextField';
import styles from './IsolationFrame.module.css';

/**
 * TextField — all variants and configs isolated for Figma MCP import.
 *
 * Layout rules:
 * - Each <section> is a named frame Figma will see as a top-level group.
 * - Each <div data-frame> holds exactly one component instance.
 * - No decorative wrappers, no shadows, no extra spacing beyond tokens.
 */
export function TextFieldIsolation() {
  return (
    <>

      {/* ── Single-line ─────────────────────────────────────────── */}

      <section className={styles.group} data-component="TextField/SingleLine/Size/Small/Empty">
        <p className={styles.label}>Single-line · Small · Empty</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Size/Small/Empty/NoLabel"><TextField size="small" placeholder="Placeholder" /></div>
          <div data-frame="TextField/SingleLine/Size/Small/Empty/WithLabel"><TextField size="small" label="Label" placeholder="Placeholder" /></div>
          <div data-frame="TextField/SingleLine/Size/Small/Empty/Helper"><TextField size="small" label="Label" placeholder="Placeholder" helperText="Helper text" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/Size/Medium/Empty">
        <p className={styles.label}>Single-line · Medium · Empty</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Size/Medium/Empty/NoLabel"><TextField size="medium" placeholder="Placeholder" /></div>
          <div data-frame="TextField/SingleLine/Size/Medium/Empty/WithLabel"><TextField size="medium" label="Label" placeholder="Placeholder" /></div>
          <div data-frame="TextField/SingleLine/Size/Medium/Empty/Helper"><TextField size="medium" label="Label" placeholder="Placeholder" helperText="Helper text" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/Size/Large/Empty">
        <p className={styles.label}>Single-line · Large · Empty</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Size/Large/Empty/NoLabel"><TextField size="large" placeholder="Placeholder" /></div>
          <div data-frame="TextField/SingleLine/Size/Large/Empty/WithLabel"><TextField size="large" label="Label" placeholder="Placeholder" /></div>
          <div data-frame="TextField/SingleLine/Size/Large/Empty/Helper"><TextField size="large" label="Label" placeholder="Placeholder" helperText="Helper text" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/Filled">
        <p className={styles.label}>Single-line · Filled</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Filled/Small"><TextField size="small" label="Label" value="Input value" /></div>
          <div data-frame="TextField/SingleLine/Filled/Medium"><TextField size="medium" label="Label" value="Input value" /></div>
          <div data-frame="TextField/SingleLine/Filled/Large"><TextField size="large" label="Label" value="Input value" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/IconLeft">
        <p className={styles.label}>Single-line · Icon left</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/IconLeft/Small"><TextField size="small" label="Label" placeholder="Placeholder" iconLeft="placeholder" /></div>
          <div data-frame="TextField/SingleLine/IconLeft/Medium"><TextField size="medium" label="Label" placeholder="Placeholder" iconLeft="placeholder" /></div>
          <div data-frame="TextField/SingleLine/IconLeft/Large"><TextField size="large" label="Label" placeholder="Placeholder" iconLeft="placeholder" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/IconRight">
        <p className={styles.label}>Single-line · Icon right</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/IconRight/Small"><TextField size="small" label="Label" placeholder="Placeholder" iconRight="placeholder" /></div>
          <div data-frame="TextField/SingleLine/IconRight/Medium"><TextField size="medium" label="Label" placeholder="Placeholder" iconRight="placeholder" /></div>
          <div data-frame="TextField/SingleLine/IconRight/Large"><TextField size="large" label="Label" placeholder="Placeholder" iconRight="placeholder" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/BothIcons">
        <p className={styles.label}>Single-line · Both icons</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/BothIcons/Small"><TextField size="small" label="Label" placeholder="Placeholder" iconLeft="placeholder" iconRight="placeholder" /></div>
          <div data-frame="TextField/SingleLine/BothIcons/Medium"><TextField size="medium" label="Label" placeholder="Placeholder" iconLeft="placeholder" iconRight="placeholder" /></div>
          <div data-frame="TextField/SingleLine/BothIcons/Large"><TextField size="large" label="Label" placeholder="Placeholder" iconLeft="placeholder" iconRight="placeholder" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/Status/Error">
        <p className={styles.label}>Single-line · Status: error</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Error/Small/Empty"><TextField size="small" label="Label" placeholder="Placeholder" status="error" helperText="This field is required" /></div>
          <div data-frame="TextField/SingleLine/Error/Medium/Empty"><TextField size="medium" label="Label" placeholder="Placeholder" status="error" helperText="This field is required" /></div>
          <div data-frame="TextField/SingleLine/Error/Large/Empty"><TextField size="large" label="Label" placeholder="Placeholder" status="error" helperText="This field is required" /></div>
          <div data-frame="TextField/SingleLine/Error/Medium/Filled"><TextField size="medium" label="Label" value="Bad input" status="error" helperText="This field is required" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/Status/Success">
        <p className={styles.label}>Single-line · Status: success</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Success/Small"><TextField size="small" label="Label" value="Valid value" status="success" helperText="Looks good!" /></div>
          <div data-frame="TextField/SingleLine/Success/Medium"><TextField size="medium" label="Label" value="Valid value" status="success" helperText="Looks good!" /></div>
          <div data-frame="TextField/SingleLine/Success/Large"><TextField size="large" label="Label" value="Valid value" status="success" helperText="Looks good!" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/SingleLine/Disabled">
        <p className={styles.label}>Single-line · Disabled</p>
        <div className={styles.row}>
          <div data-frame="TextField/SingleLine/Disabled/Small/Empty"><TextField size="small" label="Label" placeholder="Placeholder" disabled /></div>
          <div data-frame="TextField/SingleLine/Disabled/Medium/Empty"><TextField size="medium" label="Label" placeholder="Placeholder" disabled /></div>
          <div data-frame="TextField/SingleLine/Disabled/Large/Empty"><TextField size="large" label="Label" placeholder="Placeholder" disabled /></div>
          <div data-frame="TextField/SingleLine/Disabled/Medium/Filled"><TextField size="medium" label="Label" value="Input value" disabled /></div>
        </div>
      </section>

      {/* ── Multiline ───────────────────────────────────────────── */}

      <section className={styles.group} data-component="TextField/Multiline/Size">
        <p className={styles.label}>Multiline · Sizes · Empty</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Size/Small"><TextField multiline size="small" label="Label" placeholder="Placeholder" /></div>
          <div data-frame="TextField/Multiline/Size/Medium"><TextField multiline size="medium" label="Label" placeholder="Placeholder" /></div>
          <div data-frame="TextField/Multiline/Size/Large"><TextField multiline size="large" label="Label" placeholder="Placeholder" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/Multiline/Filled">
        <p className={styles.label}>Multiline · Filled</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Filled/Small"><TextField multiline size="small" label="Label" value="This is some content that spans a few words." /></div>
          <div data-frame="TextField/Multiline/Filled/Medium"><TextField multiline size="medium" label="Label" value="This is some content that spans a few words." /></div>
          <div data-frame="TextField/Multiline/Filled/Large"><TextField multiline size="large" label="Label" value="This is some content that spans a few words." /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/Multiline/Counter">
        <p className={styles.label}>Multiline · Counter</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Counter/Empty"><TextField multiline size="medium" label="Label" placeholder="Placeholder" maxLength={120} /></div>
          <div data-frame="TextField/Multiline/Counter/WithHelper"><TextField multiline size="medium" label="Label" placeholder="Placeholder" helperText="Describe your issue" maxLength={120} /></div>
          <div data-frame="TextField/Multiline/Counter/PartiallyFilled"><TextField multiline size="medium" label="Label" value="Some content." helperText="Describe your issue" maxLength={120} /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/Multiline/Counter/OverLimit">
        <p className={styles.label}>Multiline · Counter over limit</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Counter/OverLimit/Small"><TextField multiline size="small" label="Label" value="This value intentionally exceeds the maximum character limit." maxLength={40} helperText="Too long" status="error" /></div>
          <div data-frame="TextField/Multiline/Counter/OverLimit/Medium"><TextField multiline size="medium" label="Label" value="This value intentionally exceeds the maximum character limit." maxLength={40} helperText="Too long" status="error" /></div>
          <div data-frame="TextField/Multiline/Counter/OverLimit/Large"><TextField multiline size="large" label="Label" value="This value intentionally exceeds the maximum character limit." maxLength={40} helperText="Too long" status="error" /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/Multiline/Status/Error">
        <p className={styles.label}>Multiline · Status: error</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Error/Small"><TextField multiline size="small" label="Label" placeholder="Placeholder" status="error" helperText="This field is required" maxLength={120} /></div>
          <div data-frame="TextField/Multiline/Error/Medium"><TextField multiline size="medium" label="Label" placeholder="Placeholder" status="error" helperText="This field is required" maxLength={120} /></div>
          <div data-frame="TextField/Multiline/Error/Large"><TextField multiline size="large" label="Label" placeholder="Placeholder" status="error" helperText="This field is required" maxLength={120} /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/Multiline/Status/Success">
        <p className={styles.label}>Multiline · Status: success</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Success/Small"><TextField multiline size="small" label="Label" value="Valid content here." status="success" helperText="Looks good!" maxLength={120} /></div>
          <div data-frame="TextField/Multiline/Success/Medium"><TextField multiline size="medium" label="Label" value="Valid content here." status="success" helperText="Looks good!" maxLength={120} /></div>
          <div data-frame="TextField/Multiline/Success/Large"><TextField multiline size="large" label="Label" value="Valid content here." status="success" helperText="Looks good!" maxLength={120} /></div>
        </div>
      </section>

      <section className={styles.group} data-component="TextField/Multiline/Disabled">
        <p className={styles.label}>Multiline · Disabled</p>
        <div className={styles.row}>
          <div data-frame="TextField/Multiline/Disabled/Empty/Small"><TextField multiline size="small" label="Label" placeholder="Placeholder" disabled /></div>
          <div data-frame="TextField/Multiline/Disabled/Empty/Medium"><TextField multiline size="medium" label="Label" placeholder="Placeholder" disabled /></div>
          <div data-frame="TextField/Multiline/Disabled/Filled/Medium"><TextField multiline size="medium" label="Label" value="Content that cannot be edited." disabled /></div>
        </div>
      </section>

    </>
  );
}
