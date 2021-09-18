import React from "react";
import classes from "./MealsSummary.module.css";

function MealsSummary() {
  return (
    <React.Fragment>
        <section className={classes.summary}>
            <h2>Order at Japanese Resturant</h2>
            <p>
                Choose your favorite dishes from our broad selection of available meals.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients and by experienced chefs!
            </p>
        </section>
    </React.Fragment>
  );
}

export default MealsSummary;