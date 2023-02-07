function Circle({color}) {
    return(
    
    <div className="w-1/3 h-32 rounded-full border-2 border-black">
        <div className="w-full h-full rounded-full border-2 border-${color} " style={{
            border: `2px solid ${color}`
        }}></div>
    </div>
    )
    }
    
    export default Circle;