import { Component } from 'react';
import css from '../Searchbar/SearchbarStlye.module.css';
export class Searchbar extends Component {
  state = {
    search: '',
  };

  handlerOncahnge = e => {
    this.setState({
      search: e.currentTarget.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.search);
    this.props.onSubmit(this.state.search);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handlerOncahnge}
            name="search"
            value={this.state.search}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
