import { component$, useTask$ ,  useStore, $, useSignal, Signal } from "@builder.io/qwik";
import { months, days } from "~/utils/data";


interface Datas {
    year: number;
    month: number;
    day: number;
}

interface ListDays {
    status: boolean;
    weekday: string;
    day: number 
}


export default component$(() => {



const datas = useStore<Datas>({
    year: 0,
    month: 0,
    day: 0,
})
    
    const interval = useStore({
        start: 0,
        end: 7,
})
    
   const listDays = useStore<{value: ListDays[]}>({ value: [],});
    
    
  useTask$(() => {
    let today = new Date();
    datas.year = today.getFullYear();
    datas.month = today.getMonth();
    datas.day = today.getDate();
  });
    
    

    useTask$(({ track }) => {
    let daysInMonth = new Date(datas.year, datas.month + 1, 0).getDate();
    
        let newListDays = [];
        for (let i = 1; i <= daysInMonth; i++) { 
            let d = new Date(datas.year, datas.month, i);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? Number("0" + month) : month;
            day = day < 10 ? Number("0" + day) : day;
            let selectedDate = `${year}-${month}-${day}`;
            let available = true;
            console.log(selectedDate);
            //let available = user.available.filter(e=> e.date === selectedDate);

            newListDays.push({
                status: available,
                weekday: days[d.getDay()],
                day: i,
            })
        
        }
        
        listDays.value = newListDays;
        datas.day = 1;
    
    track(() => datas.year);
    track(() => datas.month);
    
    })
  
    const handleRightDateClick = $(() => { 
        let mountDate = new Date(datas.year, datas.month, 1); 
        mountDate.setMonth(mountDate.getMonth() + 1);
        datas.year = Number(mountDate.getFullYear());
        datas.month = Number(mountDate.getMonth());
        datas.day = 1;
        interval.start = 0;
        interval.end = 7;

    })
    const handleLeftDateClick = $(() => {
        let mountDate = new Date(datas.year, datas.month, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        datas.year = mountDate.getFullYear();
        datas.month = mountDate.getMonth();
        datas.day = 1;
        interval.start = 0;
        interval.end = 7;
    })

    const handleLeftDayClick = $(() => {

        if (interval.start > 0) {
            interval.start -= 7;
            interval.end -= 7;
        }
        
        
       
    })
    const selectedDate = useSignal<number>(0);

     const handleRightDayClick = $(() => {
         if (interval.end < listDays.value.length) {
            interval.start += 7;
            interval.end += 7;
        }
         
     })
    

    return (


        <div class="flex flex-col items-center justify-center">   
            <div class="flex gap-2 items-center justify-center">
                <button onClick$={handleLeftDateClick}>
                    <i class="ph ph-caret-left font-bold text-xl"></i>
                </button>


                <div class="flex items-center justify-center">

                    <h3> { months[datas.month]}  {datas.year}  </h3>
                </div>

                <button onClick$={handleRightDateClick}>
                    <i class="ph ph-caret-right  font-bold text-xl"></i>
                </button>
            </div>

            <div class="flex items-center justify-center w-96  overflow-auto">
                <button onClick$={handleLeftDayClick}>
                    <i class="ph ph-caret-left font-bold text-xl"></i>
                </button>
                {listDays.value.map((item, key) => {
                    while (key >= interval.start && key < interval.end ) {
                      
                        return (
                            
                        <button
                        key={key}
                        data-index={key}
                                onClick$={() => {
                                    datas.day = item.day;
                                    console.log(datas.day + "/" + datas.month +"/"+datas.year);
                                    
                        }}
                        class=" font-bold flex p-1 items-center justify-center"
                        > 
                        <div class="flex flex-col">
                        <span>{ item.weekday}</span>   
                        <span>{item.day}</span>
                        </div>  
                        </button>
                    )
                }
                }
                )}
            <button onClick$={handleRightDayClick}>
                    <i class="ph ph-caret-right font-bold text-xl"></i>
                </button>
            </div>
        </div>

        // <div class="flex flex-col items-center justify-center text-center ">
        //     <h1>Agenda</h1>
        //     <div class="calendly-inline-widget" data-url="https://calendly.com/cassio-henrique/30min" style="min-width:600px;height:630px;"></div>
        //     <iframe 
        //     class="rounded-xl"
        //     src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FSao_Paulo&showTitle=0&showNav=1&showDate=1&showPrint=1&src=Y2Fzc2lvLmhlbnJpcXVlQGdydXBvaXZvcnkuY29tLmJy&src=MjJlODRjNDJlMWNlYzlhYzE5N2RmMzEyNDdlZWQ5NDNlZTM0ZTRkNWRjM2Q3NDJhMTlkMWMwZDU0ZTdjNTI4MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043" style="border-width:0" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
                

        //     <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        // </div>
    )
})