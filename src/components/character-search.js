import React from "react";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import { searchCharacters } from "../actions";

export class CharacterSearch extends React.Component {
  state = {
    search: ""
  };
  renderResults() {
    if (this.props.loading) {
      return <Spinner spinnerName="circle" noFadeIn />;
    }

    if (this.props.error) {
      return <strong>{this.props.error}</strong>;
    }

    const characters = this.props.characters.map((character, index) => (
      <li key={index}>{character}</li>
    ));

    return <ul className="character-search-results">{characters}</ul>;
  }
  _onChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  _onSubmit = e => {
    e.preventDefault();
    this.props.dispatch(searchCharacters(this.state.search));
  };

  render() {
    return (
      <div className="character-search">
        {/* When this form is submitted you should submit the
                    searchCharacters action ref={input => (this.input = input)}  */}
        <form onSubmit={this._onSubmit}>
          <input
            type="search"
            onChange={this._onChange}
            value={this.state.search}
          />
          <button type="submit">Search</button>
        </form>
        <ul className="character-search-results">{this.renderResults()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  characters: state.characters,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(CharacterSearch);
