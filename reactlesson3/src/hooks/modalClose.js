import { useState , useEffect } from "react";

export default function () {
    useEffect(() => {
        window.addEventListener('click',() => closeModal());
    })
}