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
 //*서치가 끝난 후 돌아가는 버튼을 눌렀을 때 실행되는 함수
  goBacksearch() {
    this.setState({
      isFilter: false,
      categoryList: this.state.originalName,
      isSearching: false
    });
  }
//*검색용 함수. 검색어를 입력하고 버튼을 누르면 실행. 
  search(item) {
    if (this.state.isSearching) {
      return;
    }
    const result = [];
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
  
  //*카테고리 초기화 용
  emptyCategory() {
    if (this.state.isSearching) {
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

  //*해야 할 알림 목록들 초기화 용 함수
  emptylist() {
    if (this.state.isSearching) {
      return;
    }
    this.setState({
      todoList: []
    });
  }

  //*카테고리 제거용 버튼을 누르면 실행되는 함수
  removeCategory(item) {
    if (this.state.isSearching) {
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
            categoryList: "뭐 좀 하세요~~",
            todoList: [],
            totalData: []
          });
        } 
        if (this.state.categoryList !== item){
          return;
        }
        else {
          const next = this.state.categoryName[this.state.categoryName.length - 1]
          const newResult = this.state.totalData.map(element => JSON.parse(element)).filter(data => data.category === next).map(element => JSON.stringify(element))
          this.setState({
            categoryList: next,
            todoList: newResult
          })
        }
      }
    );
  }

  //*카테고리를 선택하면 실행되는 함수
  selectCategory(item) {
    if (this.state.isSearching) {
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

  //*카테고리를 추가하는 함수
  addCategory(item) {
    if (this.state.isSearching) {
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
  
  //*목록을 추가하는 함수
  addList(item) {
    if (this.state.isSearching) {
      return;
    }
    this.setState({
      todoList: this.state.todoList.concat([item])
    });
  }

  //* 누르면 완료 됐는지 안됐는지 보여주는 줄처주기 용. 
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
