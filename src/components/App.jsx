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
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      console.log('prevState.currentPage', prevState.currentPage);
      console.log('this.state.currentPage', this.state.currentPage);
      console.log('prevState.search', prevState.search);
      console.log('this.state.search', this.state.search);
      this.setState({
        loading: true,
      });
      const data = await fecthServerApi(
        this.state.search,
        this.state.currentPage
      );
      this.setState(prevState => {
        return {
          picture: [...prevState.picture, ...data.hits],
        };
      });
      this.setState({
        loading: false,
      });
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
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handlerFromForm} />

        <ImageGallery
          dataPicture={this.state.picture}
          clickOnPic={this.showToggleModal}
        />

        {this.state.picture.length !== 0 && (
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
