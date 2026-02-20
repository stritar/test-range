import { TextField } from '../../components/TextField';
import styles from './Section.module.css';

export function TextFieldSection() {
  return (
    <div className={styles.root}>

      {/* Sizes */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Sizes</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" />
          <TextField size="medium" label="Medium" placeholder="Placeholder" />
          <TextField size="large" label="Large" placeholder="Placeholder" />
        </div>
      </div>

      {/* Filled (has value) */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Filled</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" value="Input value" />
          <TextField size="medium" label="Medium" value="Input value" />
          <TextField size="large" label="Large" value="Input value" />
        </div>
      </div>

      {/* No label */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>No label</p>
        <div className={styles.row}>
          <TextField size="small" placeholder="Small" />
          <TextField size="medium" placeholder="Medium" />
          <TextField size="large" placeholder="Large" />
        </div>
      </div>

      {/* With helper text */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Helper text</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" helperText="Helper text" />
          <TextField size="medium" label="Medium" placeholder="Placeholder" helperText="Helper text" />
          <TextField size="large" label="Large" placeholder="Placeholder" helperText="Helper text" />
        </div>
      </div>

      {/* Icon left */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Icon left</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" iconLeft="placeholder" />
          <TextField size="medium" label="Medium" placeholder="Placeholder" iconLeft="placeholder" />
          <TextField size="large" label="Large" placeholder="Placeholder" iconLeft="placeholder" />
        </div>
      </div>

      {/* Icon right */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Icon right</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" iconRight="placeholder" />
          <TextField size="medium" label="Medium" placeholder="Placeholder" iconRight="placeholder" />
          <TextField size="large" label="Large" placeholder="Placeholder" iconRight="placeholder" />
        </div>
      </div>

      {/* Both icons */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Both icons</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" iconLeft="placeholder" iconRight="placeholder" />
          <TextField size="medium" label="Medium" placeholder="Placeholder" iconLeft="placeholder" iconRight="placeholder" />
          <TextField size="large" label="Large" placeholder="Placeholder" iconLeft="placeholder" iconRight="placeholder" />
        </div>
      </div>

      {/* Validation: error */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Status: error</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" status="error" helperText="This field is required" />
          <TextField size="medium" label="Medium" placeholder="Placeholder" status="error" helperText="This field is required" />
          <TextField size="large" label="Large" placeholder="Placeholder" status="error" helperText="This field is required" />
        </div>
      </div>

      {/* Validation: error — filled */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Status: error (filled)</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" value="Bad input" status="error" helperText="This field is required" />
          <TextField size="medium" label="Medium" value="Bad input" status="error" helperText="This field is required" />
          <TextField size="large" label="Large" value="Bad input" status="error" helperText="This field is required" />
        </div>
      </div>

      {/* Validation: success */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Status: success</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" value="Valid value" status="success" helperText="Looks good!" />
          <TextField size="medium" label="Medium" value="Valid value" status="success" helperText="Looks good!" />
          <TextField size="large" label="Large" value="Valid value" status="success" helperText="Looks good!" />
        </div>
      </div>

      {/* Disabled */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Disabled (empty)</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" placeholder="Placeholder" disabled />
          <TextField size="medium" label="Medium" placeholder="Placeholder" disabled />
          <TextField size="large" label="Large" placeholder="Placeholder" disabled />
        </div>
      </div>

      {/* Disabled filled */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Disabled (filled)</p>
        <div className={styles.row}>
          <TextField size="small" label="Small" value="Input value" disabled />
          <TextField size="medium" label="Medium" value="Input value" disabled />
          <TextField size="large" label="Large" value="Input value" disabled />
        </div>
      </div>

      {/* ── Multiline ───────────────────────────────────────────── */}

      {/* Multiline – sizes */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – sizes</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" placeholder="Placeholder" />
          <TextField multiline size="medium" label="Medium" placeholder="Placeholder" />
          <TextField multiline size="large" label="Large" placeholder="Placeholder" />
        </div>
      </div>

      {/* Multiline – filled */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – filled</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" value="This is some longer content that spans a few words." />
          <TextField multiline size="medium" label="Medium" value="This is some longer content that spans a few words." />
          <TextField multiline size="large" label="Large" value="This is some longer content that spans a few words." />
        </div>
      </div>

      {/* Multiline – with counter */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – counter</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" placeholder="Placeholder" maxLength={120} />
          <TextField multiline size="medium" label="Medium" placeholder="Placeholder" maxLength={120} />
          <TextField multiline size="large" label="Large" placeholder="Placeholder" maxLength={120} />
        </div>
      </div>

      {/* Multiline – counter + helper */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – counter + helper</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" placeholder="Placeholder" helperText="Describe your issue" maxLength={120} />
          <TextField multiline size="medium" label="Medium" placeholder="Placeholder" helperText="Describe your issue" maxLength={120} />
          <TextField multiline size="large" label="Large" placeholder="Placeholder" helperText="Describe your issue" maxLength={120} />
        </div>
      </div>

      {/* Multiline – near limit */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – near limit (over)</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" value="This value is intentionally way too long and exceeds the maximum character limit set on this field." maxLength={60} helperText="Too long" status="error" />
          <TextField multiline size="medium" label="Medium" value="This value is intentionally way too long and exceeds the maximum character limit set on this field." maxLength={60} helperText="Too long" status="error" />
          <TextField multiline size="large" label="Large" value="This value is intentionally way too long and exceeds the maximum character limit set on this field." maxLength={60} helperText="Too long" status="error" />
        </div>
      </div>

      {/* Multiline – status: error */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – status: error</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" placeholder="Placeholder" status="error" helperText="This field is required" maxLength={120} />
          <TextField multiline size="medium" label="Medium" placeholder="Placeholder" status="error" helperText="This field is required" maxLength={120} />
          <TextField multiline size="large" label="Large" placeholder="Placeholder" status="error" helperText="This field is required" maxLength={120} />
        </div>
      </div>

      {/* Multiline – status: success */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – status: success</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" value="Valid content here." status="success" helperText="Looks good!" maxLength={120} />
          <TextField multiline size="medium" label="Medium" value="Valid content here." status="success" helperText="Looks good!" maxLength={120} />
          <TextField multiline size="large" label="Large" value="Valid content here." status="success" helperText="Looks good!" maxLength={120} />
        </div>
      </div>

      {/* Multiline – disabled */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – disabled</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" placeholder="Placeholder" disabled />
          <TextField multiline size="medium" label="Medium" placeholder="Placeholder" disabled />
          <TextField multiline size="large" label="Large" placeholder="Placeholder" disabled />
        </div>
      </div>

      {/* Multiline – disabled (filled) */}
      <div className={styles.group}>
        <p className={styles.groupLabel}>Multiline – disabled (filled)</p>
        <div className={styles.row}>
          <TextField multiline size="small" label="Small" value="Some content that cannot be edited." disabled />
          <TextField multiline size="medium" label="Medium" value="Some content that cannot be edited." disabled />
          <TextField multiline size="large" label="Large" value="Some content that cannot be edited." disabled />
        </div>
      </div>

    </div>
  );
}
