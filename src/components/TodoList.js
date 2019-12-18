import React from "react";
import TodoListEntry from "./TodoListEntry";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      done: false,
      category: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleKeyPress(e) {
    if (e.key === "Escape") {
      document.querySelector(".newtoDolist").value = null;
      return;
    }
    if (e.key === "Enter") {
      //엔터일때
      const value = document.querySelector(".newtoDolist").value;
      if (value.length === 0) {
        window.alert("내용을 입력하세요");
        return;
      }
      this.setState({
        category: this.props.categoryList
      });
      this.handleChange();
      document.querySelector(".newtoDolist").value = null;
    }
  }

  handleChange() {
    const value = document.querySelector(".newtoDolist").value;
    this.setState(
      {value},
      () => this.props.addList(JSON.stringify(this.state))
    );
  }
  
  render() {
    if (!this.props.todoList) {
      return <div>내용을 입력해주세요!</div>;
    }
    if (this.props.isFilter !== false){
      return (
        <div className="toDo-list-whole">
          <div className="toDo-list media">
            <button onClick={()=> this.props.goBacksearch()}className="isComplete"> 돌아가기 </button>
            <div>
              {
                this.props.filteredList.filter(function(e) {
                  return JSON.parse(e).done === false;
                }).length
              }
              개의 알림 남음
            </div>
            {this.props.filteredList.map(data => (
              <TodoListEntry
                key={this.props.filteredList.indexOf(data)}
                todoList={data}
                handleComplete={this.props.handleComplete}
                isFilter={this.props.isFilter}
              />
            ))}
          </div>
        </div>
      )
    }   
    return (
      <div className="toDo-list-whole">
        <div className="toDo-list media">
          <button onClick={()=> this.props.emptylist()}className="isComplete"> 사라져라 </button>
          <div className="numberofalarm">
            {
              this.props.todoList.filter(function(e) {
                return JSON.parse(e).done === false;
              }).length
            }
            개의 알림 남음
          </div>
          {this.props.todoList.map(data => (
            <TodoListEntry
              key={this.props.todoList.indexOf(data)}
              todoList={data}
              handleComplete={this.props.handleComplete}
            />
          ))}
        </div>
        <input
          placeholder="알림을 입력하세요"
          onKeyDown={e => this.handleKeyPress(e)}
          className="newtoDolist"
          type="text"
        />
      </div>
    );
  }
}

export default TodoList;
