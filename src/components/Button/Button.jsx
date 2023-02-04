import css from '../Button/ButtonStyle.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick, disabled, textChenge }) => {
  return (
    <>
      <div className={css.buttonFlex}>
        <button disabled={disabled} onClick={onClick} className={css.Button}>
          {textChenge}
        </button>
      </div>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.func.isRequired,
  textChenge: PropTypes.func.isRequired,
};