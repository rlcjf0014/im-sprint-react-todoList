import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0 //검색 남용 방지
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //*디바운스? 관리용 함수
  componentDidMount() {
    setInterval(() => this.setState({ count: 0 }), 5000);
  }

  //*엔터 쳤을 때 검색하게하기
  handleKeyPress(e) {
    const { count } = this.state;
    const text = document.querySelector(".form-control").value;
    if (count > 3) {
      alert("적당히 하세요");
      return;
    }
    if (e.key === "Enter") {
      if (text.length === 0) {
        alert("내용을 입력하세요");
        return;
      }
      this.props.search(text);
      this.setState({ count: count + 1 });
      document.querySelector(".form-control").value = null;
    }
    if (e.key === "Escape") {
      document.querySelector(".form-control").value = null;
      return;
    }
  }
  //*클릭 버튼 누르면 검색
  handleClick() {
    const { count } = this.state;
    const text = document.querySelector(".form-control").value;
    if (count > 3) {
      alert("적당히 하세요");
      return;
    }

    if (text.length === 0) {
      alert("입력을 해야지");
      return;
    }

    this.props.search(text);
    this.setState({ count: count + 1 });
    document.querySelector(".form-control").value = null;
  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input
          onKeyDown={e => this.handleKeyPress(e)}
          className="form-control"
          type="text"
          placeholder="검색어를 입력하세요"
        />
        <button className="btn hidden-sm-down" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    );
  }
}

export default Search;
