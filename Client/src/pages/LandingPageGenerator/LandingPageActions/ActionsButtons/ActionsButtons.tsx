
import actionButtonsStyle from './actionButtons.module.css';

interface ActionsButtonsProps {
  onDelete: () => void;
  sectionName: string;
}

export default function ActionsButtons({ onDelete }: ActionsButtonsProps) {
  return (
    <div className={actionButtonsStyle.actionButtonsContainer}>
      <button className={actionButtonsStyle.actionButton} onClick={onDelete}>
        ✖
      </button>
    </div>
  );
}
