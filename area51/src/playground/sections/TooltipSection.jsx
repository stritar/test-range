import { Tooltip } from '../../components/Tooltip';
import { ToolbarIconButton } from '../../components/ToolbarIconButton';
import styles from './Section.module.css';

export function TooltipSection() {
  return (
    <div className={styles.root}>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Label only</p>
        <div className={styles.row}>
          <Tooltip label="Bold">
            <ToolbarIconButton icon="bold" ariaLabel="Bold" />
          </Tooltip>
        </div>
      </div>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Label + shortcut</p>
        <div className={styles.row}>
          <Tooltip label="Bold" shortcut="⌘B">
            <ToolbarIconButton icon="bold" ariaLabel="Bold" />
          </Tooltip>
        </div>
      </div>

    </div>
  );
}
