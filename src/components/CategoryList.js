import React from "react";
import CategoryListEntry from "./CategoryListEntry";

// 실제 API를 쓰게 되면 이 fakeData는 더이상 import 하지 않아야 합니다.

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      done: false,
      appear: false
    };
  }

  handleKeyPress(e) {
    const value = document.querySelector(".newCategory").value;
    if (e.key === "Escape") {
      document.querySelector(".newCategory").value = null;
      return;
    }
    if (e.key === "Enter") {
      //엔터일때
      if (value.length === 0) {
        window.alert("내용을 입력하세요");
        return;
      }
      this.props.addCategory(value);
      document.querySelector(".newCategory").value = null;
    }
  }

  handleClick() {
    this.setState({
      appear: !this.state.appear
    });
  }

  render() {
    if (this.state.appear === true) {
      return (
        <div className="watch-list-entry">
          <input
            placeholder="새로운 카테고리"
            className="newCategory"
            type="text"
            onKeyDown={e => this.handleKeyPress(e)}
          />
          <button className="categoryButton" onClick={() => this.handleClick()}>이제그만</button>
          <button className="categoryButton" onClick={() => this.props.emptyCategory()}>초기화</button>
          {this.props.categoryName.map(data => (
            <CategoryListEntry
              key={this.props.categoryName.indexOf(data)}
              categoryName={data}
              selectCategory={this.props.selectCategory}
              removeCategory={this.props.removeCategory}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="watch-list-entry">
        <button className="categoryButton"  onClick={() => this.handleClick()}>생성</button>
        <button className="categoryButton"  onClick={() => this.props.emptyCategory()}>초기화</button>
        {this.props.categoryName.map(data => (
          <CategoryListEntry
            key={this.props.categoryName.indexOf(data)}
            categoryName={data}
            selectCategory={this.props.selectCategory}
            removeCategory={this.props.removeCategory}
          />
        ))}
      </div>
    );
  }
}
export default CategoryList;
