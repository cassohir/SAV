import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div class="flex flex-col items-center justify-center text-center ">
            <h1>Agenda</h1>
            <div class="calendly-inline-widget" data-url="https://calendly.com/cassio-henrique/30min" style="min-width:600px;height:630px;"></div>
            <iframe 
            class="rounded-xl"
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FSao_Paulo&showTitle=0&showNav=1&showDate=1&showPrint=1&src=Y2Fzc2lvLmhlbnJpcXVlQGdydXBvaXZvcnkuY29tLmJy&src=MjJlODRjNDJlMWNlYzlhYzE5N2RmMzEyNDdlZWQ5NDNlZTM0ZTRkNWRjM2Q3NDJhMTlkMWMwZDU0ZTdjNTI4MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%230B8043" style="border-width:0" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
                

            <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
        </div>
    )
})