import { useState } from 'react';
import { Tooltip } from '../../components/Tooltip';
import { ToolbarIconButton } from '../../components/ToolbarIconButton';
import styles from './Section.module.css';

export function ToolbarIconButtonSection() {
  const [boldSelected, setBoldSelected] = useState(false);

  return (
    <div className={styles.root}>

      <div className={styles.group}>
        <p className={styles.groupLabel}>States</p>
        <div className={styles.row}>
          <ToolbarIconButton icon="bold" ariaLabel="Bold" />
          <ToolbarIconButton icon="bold" ariaLabel="Bold (selected)" selected />
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Interactive — click to toggle</p>
        <div className={styles.row}>
          <Tooltip label="Bold" shortcut="⌘B">
            <ToolbarIconButton
              icon="bold"
              ariaLabel="Bold"
              selected={boldSelected}
              onClick={() => setBoldSelected((prev) => !prev)}
            />
          </Tooltip>
        </div>
      </div>

    </div>
  );
}
