import React, { useEffect, useState } from 'react'

const Todo = () => {
    const[todos,setTodos] = useState([]);
    const[filterList,setFilterList] = useState([]);
    const[isVisible, setVisible] = useState(false);
    const[inputVal,setInputVal] = useState('');
    const[isSearching, setSearching] = useState(false);

    useEffect(()=>{
        async function fetchApi(){
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            
            let results = await response.json();

            setTodos(()=>([
                ...results
            ]))

        }
        
        fetchApi();
        setVisible(true);
    },[]);


    const handleInput=(e)=>{
        setInputVal(e.target.value)
    }

    const handleSearch=()=>{
        setSearching(true);
        // console.log(inputVal);
        let filterData = todos.filter((item,index)=>{
            
            if(inputVal == item.title  || inputVal == item.id ){
                console.log(item);
                return item
            }
            else if(inputVal==''){
                return todos
            }
        })
        console.log(filterData);
        setFilterList(()=>([
            ...filterData
        ]))
        
        console.log('button clicked');
    }
    
    const mapData = todos.map((item,index)=>{
        return(
            <div key={index}>
                <hr/>
                <br/>
                <h3>Id: {item.id} </h3>
                <h3 style={{display:'inline'}}>Title : </h3><p style={{display:'inline'}}> {item.title} </p>
                <h5>Completed : {item.completed?'Yes':'No'}</h5>
                
            </div>
        )
    })
    const filterData = filterList.map((item,index)=>{
        return(
            <div key={index}>
                <hr/>
                <br/>
                <h3>Id: {item.id} </h3>
                <h3 style={{display:'inline'}}>Title : </h3><p style={{display:'inline'}}> {item.title} </p>
                <h5>Completed : {item.completed?'Yes':'No'}</h5>
                
            </div>
        )
    })

  return (
    <div>
        <h2>Todo App</h2>
        {
        isVisible?
        <>
        <input placeholder='Enter id or title to search' onInput={handleInput} />
        <button onClick={handleSearch}>Search</button>
        </>
        :
        null
        }
        {isSearching? filterData:mapData}
        
    </div>
  )
}

export default Todo