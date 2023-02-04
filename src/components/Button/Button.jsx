import css from '../Button/ButtonStyle.module.css';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';

export const Button = ({ onClick, state }) => {
  return (
    <>
      {state && <Loader />}
      <div className={css.buttonFlex}>
        <button onClick={onClick} className={css.Button}>
          Load More
        </button>
      </div>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
