import React from "react";
import Nav from "./Nav";
import TodoList from "./TodoList";
import CategoryList from "./CategoryList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.emptylist = this.emptylist.bind(this);
    this.emptyCategory = this.emptyCategory.bind(this);
    this.search = this.search.bind(this);
    this.goBacksearch = this.goBacksearch.bind(this);
    this.state = {
      totalData: [],
      todoList: [],
      categoryList: "미리알림",
      originalName: "",
      categoryName: [],
      filteredList: [],
      isFilter: false,
      isSearching: false
    };
  }

  goBacksearch() {
    this.setState({
      isFilter: false,
      categoryList: this.state.originalName,
      isSearching: false
    });
  }

  search(item) {
    var result = [];
    const replaced = this.state.totalData
      .concat(this.state.todoList)
      .map(element => JSON.parse(element));
    for (let element of replaced) {
      if (element.value.includes(item)) {
        result.push(JSON.stringify(element));
      }
    }
    this.setState({
      filteredList: result,
      originalName: this.state.categoryList,
      categoryList: `${item}을 찾은 결과입니다`,
      isFilter: !this.state.isFilter,
      isSearching: !this.state.isSearching
    });
  }

  emptyCategory() {
    if (this.state.isSearching){
      return;
    }
    this.setState(
      {
        categoryName: [],
        categoryList: "목록을 넣어주쇼~"
      },
      () => this.emptylist()
    );
  }

  emptylist() {
    if (this.state.isSearching){
      return;
    }
    this.setState({
      todoList: []
    });
  }

  removeCategory(item) {
    if (this.state.isSearching){
      return;
    }
    var result = [];
    const replaced = this.state.totalData.map(element => JSON.parse(element));
    for (let element of replaced) {
      if (element.category !== item) {
        result.push(JSON.stringify(element));
      }
    }
    this.setState({
      totalData: this.state.totalData.concat(this.state.todoList)
    });
    this.setState(
      {
        totalData: result,
        categoryName: this.state.categoryName.filter(data => data !== item)
      },
      () => {
        if (this.state.categoryName.length === 0) {
          this.setState({
            categoryList: "뭐 좀 하세요~~"
          });
        } else {
          this.setState({
            categoryList: this.state.categoryName[
              this.state.categoryName.length - 1
            ]
          });
        }
      }
    );
  }

  selectCategory(item) {
    if (this.state.isSearching){
      return;
    }
    if (item === this.state.categoryList) {
      return;
    }
    var result = [];
    var newresult = [];
    const replaced = this.state.totalData.map(element => JSON.parse(element));
    for (let element of replaced) {
      if (element.category === item) {
        result.push(JSON.stringify(element));
      } else {
        newresult.push(JSON.stringify(element));
      }
    }
    this.setState({
      totalData: newresult.concat(this.state.todoList),
      categoryList: item,
      todoList: result
    });
  }

  addCategory(item) {
    if (this.state.isSearching){
      return;
    }
    if (!this.state.categoryName.includes(item)) {
      this.setState({
        totalData: this.state.totalData.concat(this.state.todoList),
        categoryName: this.state.categoryName.concat([item]),
        todoList: [],
        categoryList: item
      });
    } else {
      window.alert("같은 이름의 카테고리는 만들 수 없습니다!");
    }
    return;
  }

  addList(item) {
    if (this.state.isSearching){
      return;
    }
    this.setState({
      todoList: this.state.todoList.concat([item])
    });
  }

  handleComplete(e) {
    const replaced = this.state.todoList.map(element => JSON.parse(element));
    for (let element of replaced) {
      if (element.value === e) {
        element.done = !element.done;
      }
    }
    this.setState({
      todoList: replaced.map(element => JSON.stringify(element))
    });
  }

  render() {
    return (
      <div className="start">
        내일 일을 미루지말자
        <div className="main">
          
          <Nav search={this.search} />
          <div className="col-md-7">
            카테고리
            <CategoryList
              addCategory={this.addCategory}
              selectCategory={this.selectCategory}
              totalData={this.state.totalData}
              categoryName={this.state.categoryName}
              removeCategory={this.removeCategory}
              emptyCategory={this.emptyCategory}
            />
          </div>
          <div className="col-md-5">
            {this.state.categoryList}
            <TodoList
              goBacksearch={this.goBacksearch}
              filteredList={this.state.filteredList}
              isFilter={this.state.isFilter}
              addList={this.addList}
              todoList={this.state.todoList}
              handleComplete={this.handleComplete}
              categoryList={this.state.categoryList}
              emptylist={this.emptylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

// *
// ?
// !

export default App;
