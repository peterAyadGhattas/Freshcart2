// import { createContext, useState } from "react";

   




// export const CounterContext =createContext()

//  export default function CounterContextProvider({children}){
//        const [counter, setCounter] = useState()




//     return <>
//      <CounterContextProvider   value= { {counter , setCounter}}> 

// {children}

//     </CounterContextProvider>
    
//     </>
// }
import { createContext, useState } from "react";

export const CounterContext = createContext();

export default function CounterContextProvider({ children }) {
    const [counter, setCounter] = useState(0); // Initialize the counter with 0 or any default value

    return (
        <CounterContext.Provider value={{ counter, setCounter }}> 
            {children}
        </CounterContext.Provider>
    );
}
