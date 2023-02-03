import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fecthServerApi } from 'api/apiService';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    search: '',
    picture: [],
    currentPage: 1,
    visibility: false,
    image: '',
    loading: false,
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      console.log(prevState, 'prevSearch');
      console.log(this.state.search);
      this.setState({
        loading: true,
      });
      const data = await fecthServerApi(
        this.state.search,
        this.state.currentPage
      );
      this.setState({
        picture: data.hits,
      });
      this.setState({
        loading: false,
      });
    }
  }
  handlerFromForm = search => {
    console.log(search);
    this.setState({
      search,
    });
  };

  showToggleModal = image => {
    this.setState(prevState => {
      return {
        visibility: !prevState.visibility,
        image,
      };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handlerFromForm} />
        {this.state.loading && <Loader />}
        <ImageGallery
          dataPicture={this.state.picture}
          clickOnPic={this.showToggleModal}
        />
        {this.state.visibility && (
          <Modal closeModal={this.showToggleModal} img={this.state.image} />
        )}
      </>
    );
  }
}
