import css from '../ImageGalleryItem/ImageGalleryItemStyle.module.css';

export const ImageGalleryItem = ({ el, clickOnItemPic }) => {
  return (
    <li
      className={css.ImageGallerytem}
      onClick={() => clickOnItemPic(el.largeImageURL)}
    >
      <img src={el.webformatURL} alt="" />
    </li>
  );
};
