import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import css from '../ImageGallery/ImageGalleryStyle.module.css';
export class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          {this.props.dataPicture.map(el => {
            return (
              <ImageGalleryItem
                key={el.id}
                el={el}
                clickOnItemPic={this.props.clickOnPic}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
