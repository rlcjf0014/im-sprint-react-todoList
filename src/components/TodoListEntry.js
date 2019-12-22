import React from "react";



class TodoListEntry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false
    }
    this.handleClick = this.handleClick.bind(this); 
  }
  
  //* 누르면 완료 됐는지 안됐는지 보여주는 줄처주기 용. 
  handleClick(e) {
    this.props.handleComplete(e.target.innerHTML)
  }

  render(){
    const data = JSON.parse(this.props.todoList)
    const style = {
      textDecoration: data.done ? "line-through" : "none" 
    }
    if (data === undefined){
      return (<div>Write Something~~~</div>)
    }
    return(
      <div className="toDo-list-entry">
      <div className="list-body">
        <div style={style} onClick={e => this.handleClick(e)} className="toDo-list-entry-detail">{data.value}</div>
      </div>
    </div> 
    )
  }

}

export default TodoListEntry;

