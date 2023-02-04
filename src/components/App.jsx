import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fecthServerApi } from 'api/apiService';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    search: '',
    picture: [],
    currentPage: 1,
    visibility: false,
    image: '',
    loading: false,
    tags: '',
  };
  async componentDidUpdate(prevProps, prevState) {
    const { search, currentPage } = this.state;
    if (prevState.search !== search || prevState.currentPage !== currentPage) {
      // console.log('prevState.currentPage', prevState.currentPage);
      // console.log('this.state.currentPage', this.state.currentPage);
      // console.log('prevState.search', prevState.search);
      // console.log('this.state.search', this.state.search);
      this.setState({
        loading: true,
      });
      try {
        const data = await fecthServerApi(search, currentPage);
        this.setState(prevState => {
          return {
            picture: [...prevState.picture, ...data.hits],
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }
  handlerFromForm = search => {
    console.log(search);

    this.setState({
      currentPage: 1,
      image: '',
      search,
      picture: [],
    });
  };

  showToggleModal = (image, tags) => {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility,
        image,
        tags,
      };
    });
  };

  loadMOreButton = () => {
    this.setState(prevState => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
    //  if (this.currentPage !== 1) {
    //    this.scrollOnLoadButton();
    //  }
  };

  //   scrollOnLoadButton = () => {
  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handlerFromForm} />

        <ImageGallery
          dataPicture={this.state.picture}
          clickOnPic={this.showToggleModal}
        />

        {this.state.picture.length > 0 && this.state.picture.length >= 12 && (
          <Button onClick={this.loadMOreButton} />
        )}

        {this.state.loading && <Loader />}

        {this.state.visibility && (
          <Modal
            closeModal={this.showToggleModal}
            img={this.state.image}
            tags={this.state.tags}
          />
        )}
      </>
    );
  }
}
