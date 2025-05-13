import React from "react"
import { ReactSortable } from "react-sortablejs";
import DraggableColorBox from "./DraggableColorBox"


const DraggableColorList = ({colors, handleDelete, sortedColors}) => {
    return (
        <ReactSortable
            tag="div"
            list={colors}
            setList={(newColorList) => sortedColors(newColorList)}
            style={{ height: "100%" }}
        >
            {colors.map((color, i)=>(
                <DraggableColorBox 
                    index={i}
                    handleDelete={() => handleDelete(color.name)} 
                    color={color.color} 
                    name={color.name}/>
            ))}
        </ReactSortable>
    )}

export default DraggableColorList