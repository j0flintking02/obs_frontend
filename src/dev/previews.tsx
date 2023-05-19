import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "../App.tsx";
import SignIn from "../pages/SignIn.tsx";
import {Register} from "../pages/Register.tsx";
import HomePage from "../pages/HomePage.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/SignIn">
                <SignIn/>
            </ComponentPreview>
            <ComponentPreview path="/Register">
                <Register/>
            </ComponentPreview>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;