import React from "react";


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0 //검색 남용 방지
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setInterval(
      () => this.setState({count: 0}), 
      5000
    );
  }
  
  handleClick() {
    const { count } = this.state;
    const text = document.querySelector(".form-control").value
    if (count > 3) {
      alert('적당히 하세요');
      return ;
    } 
    
    if (text.length === 0) {
      alert('입력을 해야지');
      return ;
    }
  
    this.props.search(text)
    this.setState({count: count + 1});
    document.querySelector(".form-control").value = null;
  }

  // handleKeyPress(e){

  // }
  
  
  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" type="text" placeholder="검색어를 입력하세요"/>
        <button className="btn hidden-sm-down" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    );
  }
}

export default Search;
