import { $, component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { FormStateContext } from "~/contexts/FormContext";

import { dropDownData } from "~/utils/data";



type RouteData = {
    routeName: string;
    routePath: string;
    icon?: string;
}

interface DropDownProps {
    data?: RouteData[];
    title: string;
}

/* w-[340px] h-[340px] */

export const Dropdown = component$((dropDownList: DropDownProps) =>{
    /* 
    const isOpen = useStore({
        visible: false,
    });
     ${!formState.isOpen ? "hidden" : "" }
    */
    const formState  = useContext(FormStateContext);
   const isOpen = useSignal(false);
    const store = useStore({ count: 0, visible: true })
    const count = useSignal(0);
    return (
      <div class={`relative flex flex-col ml-auto mr-16 items-center rounded-lg`}>
        <button
        class="bg-purple-500 h-5 w-5 p-4 w-full flex items-center justify-between 
        font-bold text-lg rounded-lg tracking-wider border-4 border-transparent 
        active:border-white duration-300 active:text-white"
         onClick$={() => {isOpen.value = !isOpen.value
            console.log(isOpen.value)
        }}
         
         > {dropDownList.title}

            {
                isOpen.value == true ? (
                    <i class="ph-caret-up"></i>
                ) : (
                    <i class="ph-caret-down"></i>
                )
            }

        </button>
        {isOpen.value && (
            <div class="bg-purple-500 absolute top-10 flex flex-col rounded-lg p-2 w-full">
                {dropDownList.data?.map((item,index) => (
                    <a href={item.routePath}>
                    <div class="flex pl-1  w-full justify-between hover:bg-purple-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4" key={index}>
                        <h3 class="font-bold">{item.routeName}</h3>
                        <i class={`${item.icon} text-xl`}></i>
                    </div>
                    </a>
                ))}
            </div>
        )}
      </div>   
    )
})

export default Dropdown;