import React, {useEffect, useState} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";


function AvailableMeals() {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(); // 因为我们后面需要打印message所以这里可以先undefine

  // only started for the component load for the first time 因为后面有[]
  useEffect(() => {
    setIsLoading(true);
    //useEffect 里面不能直接写async function -> 里面再写一个function 可以用async
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-470ee-default-rtdb.firebaseio.com/meals.json');
      
      if(!response.ok){
        throw new Error("Something went wrong!");
      }
      
      // object but we need array
      const responseData = await response.json();

      const loadedMeals = [];
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
      
    // 这里不能用try catch 因为这个 fetchMeals() 是async function 所以要使用
    // .then() -> 成功的话  .catch() -> 失败的话
    // try{
    //   fetchMeals();
    // } catch (error) {
    //   isLoading(false);
    //   setHttpError(error);
    // }

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  },[]); // no external dependency right now
    // 我们需要把这个loadedMeals expose给下面的mealslist 并且rerender component 如果这个list改变了 -》

    if(isLoading){
      return <section className={classes.mealsLoading}>Loading...</section>
    }

    if(httpError){
      return (
        <section className={classes.mealsError}>
          <p>{httpError}</p>
        </section>
      );
    }

    // 不要忘记array需要keyId
    const mealsList = meals.map((meal) => 
      <MealItem 
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
        id={meal.id}/>);

    return (
        <section className={classes.meals}>
          <Card><ul>{mealsList}</ul></Card>
        </section>
    );
}

export default AvailableMeals;

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];