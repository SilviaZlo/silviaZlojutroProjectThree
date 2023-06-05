import Form from "./Form";
import Pic from "./Pic";

import { useEffect, useState } from "react";

import axios from "axios";

import './styles/App.css';

const Recipes = () => {

    console.log('Recipes are rendering!');

    // initialize the state which will represent the array of recipe pic objects coming from the API
    const [ recipePics, setRecipePics] = useState([]);

    // initialize a piece of state which represents the cuisine value (which the user will be selecting from the form dropdown)
    const [ cuisineOptions, setCuisineOptions] = useState(null);

    // define a side effect which makes a call to the Spoonacular API
    useEffect(() => {
        axios({
            url: 'https://api.spoonacular.com/recipes/complexSearch',
            method: 'GET',
            dataResponse: 'json',
            
            params: {
                cuisine: cuisineOptions,
                apiKey: '22dfd5f34ce14cb7add89275c1fe006c',
                
            },
        }).then( (response) => {

            // update state using the array returned to us from the API
            setRecipePics(response.data.results);
        });

        // use the cuisine option state within the dependency array, so that every time the state changes, the side effect - AKA the API call - runs and gets pics of the chosen cuisine 
    }, [cuisineOptions]);
    

    // defining an event handler which will be passed down to Form via props (Form will trigger/call this function when the form is submitted)
    const selectCuisine = (event, cuisine) => {

        // this func is going to be called when the form is submitted, so it must first STOP the default behaviour of the form submission (= not refresh the page)
        event.preventDefault();

        // update the cuisine's recipe photos state with the user's choice
        setCuisineOptions(cuisine);
    }
    console.log(recipePics);
    return (
        <section>
            {/* pass the form submit event handler func down via props */}
            <Form handleSubmit={selectCuisine} />
            <div class="wrapper">
                <ul className="photos">
                    {
                        // map through the state array and for each object in the array we will return a Pic component
                        // pass down: the image URL, a unique id, and alt text via props
                        // 

                        recipePics.map((recipeObj) => {
                            return (
                                <div class="recipesContainer">
                                    <p>{recipeObj.title}</p>
                                    <Pic
                                        key={recipeObj.id}
                                        imageSource={recipeObj.image}
                                        // verificar se no meu api a imagem esta sob urls.regular
                                        altText={recipeObj.title}
                                        // verificar se no meu api a descricao da imagem esta sob alt_description
                                        />
                                </div>
                            )
                            
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default Recipes;