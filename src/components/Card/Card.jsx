import cx from 'classnames';
import styles from './card.module.scss';

export const Card = ({ data, isChecked, onCardSelect }) => {
    const { title, id } = data;

    return <span className={cx(styles.card, isChecked && styles.checked)} onClick={() => onCardSelect(id)}>{title}</span>
}
