import {Button} from "react-bootstrap";
import React, {SetStateAction} from "react";
import "./style/selectorStyle.css"
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props={
    stock:number|undefined;
    count:number
    setCount:React.Dispatch<SetStateAction<number>>
}


export default function Selector(props:Props) {

    let handleMinusButton = ()=>{
        if (props.count>1)
            props.setCount(oldCount=>oldCount-1)
    }

    let handlePlusButton = ()=>{
        if (!props.stock){
            return
        }

        if (props.stock>props.count){
            props.setCount(oldCount => oldCount+1)
        }
    }

    let renderSelector = ():JSX.Element=>{
        return props.stock !== 0 ? (<div id="counting-bar-container">
            <Button variant={"outline-dark"} onClick={handleMinusButton}>-</Button>
            <div id="count">{props.count}</div>
            <Button variant={"outline-dark"} onClick={handlePlusButton}>+</Button>
        </div>) : <div id="counting-bar-container">
            <Button disabled variant={"outline-dark"} onClick={handleMinusButton}>-</Button>
            <div id="count">0</div>
            <Button disabled variant={"outline-dark"} onClick={handlePlusButton}>+</Button>
        </div>

    }


    return(<div id="counting-bar-container">
        {renderSelector()}
    </div>)

}