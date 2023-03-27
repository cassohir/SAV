
import { component$, useSignal } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';

const Menus = [
  { title: "Pesquisar", iClass: "ph-magnifying-glass", gap:true,link: "/"},
   { title: "DashBoard", iClass: "ph-gauge", gap:true,link: "/"},  
   { title: "Veterinários", iClass: "ph-users", gap:true,link: "/veterinarios"},
   { title: "Clínicas", iClass: "ph-syringe", gap:true,link: "/"},
   { title: "Matriz de Colunas", iClass: "ph-projector-screen-chart", gap:true,link: "/matriz"},
   { title: "Configurações", iClass: "ph-gear", gap:true,link: "/configuracoes"}

]


export const SideBar = component$(() => {
  const isOpen = useSignal(false);

  return (
    <div class={`h-full z-10  bg-purple-700 fixed top-0   duration-300
     ${isOpen.value ? "w-72" : "w-16 bg-purple-700"} `}>
      <i onClick$={() => isOpen.value = !isOpen.value} class={`ph-list translate-x-5 absolute cursor-pointer flex ${isOpen.value ? "right-0 items-center justify-end" : "justify-center right-3"} top-12 w-9 text-xl  bg-style-100 rounded-xl p-1`}></i>
      <div class="mb-3 flex gap-x-4 items-center p-5">
        
          <QwikLogo />
          {isOpen.value && (       
            <h1>SAV</h1>  
          )}
      </div>
      <ul>
        {Menus.map((menu, index) => (
          <a href={menu.link}>
          <li onClick$={() => isOpen.value = !isOpen.value} class="text-gray-100 text-sm flex items-center gap-x-4 cursors-pointer p-5 hover:bg-purple-500 rounded-md " key={index}>
            <i class={`${menu.iClass} text-xl ` }></i>
            <h3 class={`font-medium ${!isOpen.value && 'hidden'} origin-left duration-300`}>

                    {menu.title}   

              </h3>
            </li>
               </a>
        ))}
      </ul>
    </div>
  );
});