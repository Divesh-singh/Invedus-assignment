import Circle from "../components/Circle";


const colors=["black", "red", "green", "yellow", "blue", "brown", "pink", "yellow", "violet"];

function ColorCircle({color}) {
return(

<div className="flex flex-wrap">
    {colors.map((color, index)=>(
        <Circle key={index} color={color} />
    ))}
</div>

)
}

export default ColorCircle;