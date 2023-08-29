import React, { useEffect, useState } from 'react'
const getLocalItems = ()=>{
    let list =localStorage.getItem('lists');
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem("lists"))
    }else{
        return [];
    }
}
const Todo = () =>{
    const [inputData,setInputData] = useState('');
    const [items,setItems] = useState(getLocalItems());
    const [toggleSubmit,setToggleSubmit] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);
    const addItem = ()=>{
        if(!inputData){
            alert("data filled")
        }else if(inputData && !toggleSubmit){
            setItems(items.map((elem)=>{
                if(elem.id === isEditItem ){
                    return {...elem,name:inputData}
                }
                return elem;
            })
            )
            setToggleSubmit(false);
            // setInputData(newEditItem.name)
            // setIsEditItem(id)
          setInputData('')
          setIsEditItem(null);
        }
        else{
            const allInputData = {id:new Date().getTime().toString(),name:inputData}
    setItems([...items,allInputData])
        setInputData('')
    }}
    const deleteItem =(index)=>{
        // console.log(id);
        console.log(index);
        const updateItems = items.filter((elem)=>{
            return index !== elem.id;
        })
        setItems(updateItems)
    }
    //not
    // const deleteItem =(id)=>{
    //     console.log(id);
    //     const updateItems = items.filter((elem,ind)=>{
    //         return ind !== id;
    //     })
    //     setItems(updateItems)
    // }
    const editItem =(id)=>{
        let newEditItem =  items.find((elem)=>{  
            return elem.id === id

        })
        console.log("items"+items + "id" + id )
        console.log("newEdititem" +newEditItem);
        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setIsEditItem(id);
        console.log("newEdititem" +newEditItem);

    }
    const removeAll =()=>{
        setItems([])
    }
    // useEffect(()=>{
    //     localStorage.setItem('lists',JSON.stringify(items))
    // },[items])
  return (
   <>
   <div className="main">
        <div>
                <img src="" alt="todo" />
            <figure>
                <figcaption>Add your list</figcaption>
            </figure>
        <div className="addItems">
            <input type="text"  placeholder='Add Items'   value={inputData} 
            onChange={(e)=>setInputData(e.target.value)}/>
            {
                toggleSubmit ?  <i className="fas fa-plus"   onClick={addItem}
                title='Add Item' style={{color: "#000000"}}>+</i> :
                <i className="far fa-edit"   onClick={addItem}
                title='Add Item' style={{color: "#000000"}}>++</i> 
            }
           
        </div>
        <div className="showItems">
            {
            // items.map((elem,ind)=>{
            //key={ind}
            items.map((elem)=>{
                return(
            <div className="eachItem" key={elem.id}> 
                <h3>{elem.name}</h3>
                <div className="todo-btn">
                <i className="fas fa-edit" title='Edit Item' onClick={()=>editItem(elem.id)}>++</i>

                <i className="fas fa-trash-alt" title='Delete Item' onClick={()=>deleteItem(elem.id)}>-</i>
                </div>
            </div>
         )
                })
        }
        </div>
            <div className="showItems">
                <button className='btn' data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span>    </button>
            </div>
        </div>
   </div>
   </>
  )
}

export default Todo
