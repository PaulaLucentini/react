
import { useState, useEffect } from 'react';
import "./App.css";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import Counter from "./components/counter";
import Input from "./components/input";





function App() {

  const [counter, setCounter] = useState(0);
  const [task, setTask] = useState ('');
  const [active, setActive] = useState(false);
  const [products, setProducts]=useState([]);

  const isValidCounter = counter > 0;

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  const decrementCounter = () => {
    if(!isValidCounter) return
    setCounter((prevCounter => prevCounter - 1));
  };

  const onChange = (event) => {
    const value = event.target.value;
    setTask(value);
  }
  const onFocus = () => {
    setActive(true);
  }
  const onBlur = () => {
    setActive(false);
  }
  const inputClass = `container ${active ? 'active' : ''}`,

  
useEffect (()=>{
    const getProduct = async ()=>{
      try{
        const response = await fetch('https://64c25d8beb7fd5d6ebcfb73e.mockapi.io/products', {
          method: 'GET',
          headers:{
            'content-type':'application/json',
          },
        });

        const data = await response.json();

        setProducts(data);
        }catch (error){
        console.error(error);
      }
    }

    getProduct();
  }, [])

  console.log({products})



  return (
    
      <div>
        <NavBar logo="Pupi"/>
        <ItemListContainer greeting="Hola Mundo"/>
        <Counter isValidCounter={isValidCounter} counter={counter} onDecrementCounter={decrementCounter} onIncrementCounter={incrementCounter}/>
        <div style={{width: '300px', padding:'1rem'}}>
            <Input
              id='Task'
              placeholder='Add a new task'
              required={true}
              name='Task name'
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={inputClass}
            />
        </div>  
      </div> 
  );
}

export default App;
