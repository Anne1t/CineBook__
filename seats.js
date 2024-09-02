window.onload=function(){
    s_time=localStorage.getItem("show_time"); //grab the selected show time from localStorage
    document.getElementById("show_time").innerHTML="Show for " + s_time +"<br> <br>"; 
}

function confirmed(){
    window.alert("Your booking has been confirmed!"); //after the booking is confirmed form the modal
    window.open("../html/confirmed.html", "_self");
    localStorage.removeItem("seatsSel");
    localStorage.removeItem("no");
    localStorage.removeItem("price");
}

function seats(){
    window.open("../html/seats.html", "_self");
}

window.history.forward(); //to prevent the user from being able to return to the bookings page after payment

const container=document.querySelector(".container");
const seat=document.querySelectorAll(".row .seats:not(.occp)");
const count=document.getElementById("count");
const total=document.getElementById("total");
let ticketPrice= 550;
restoreSel(); //so that the selections are not lost even after reload

container.addEventListener("click", (e)=>{
    if(e.target.classList.contains("seats") && !e.target.classList.contains("occp")){
        e.target.classList.toggle("sel"); //makes the seats selectable and unselectable
    }
    updateSel();
});

function updateSel(){
    const seatsSel= document.querySelectorAll(".row .seats.sel");
    const selSeatsNo=seatsSel.length; //number of selected seats from the array
    count.innerText= selSeatsNo;
    total.innerText=selSeatsNo*ticketPrice;
    const indexSeats=[...seatsSel].map(function(seats){  //copying the selected seats. 'seats' is the value of the current selected seats.
        return [...seat].indexOf(seats); //copying all the seats and then returning the index of the selected seats from the array 'seat'
    });
    localStorage.setItem("seatsSel", JSON.stringify(indexSeats));
    localStorage.setItem("no", selSeatsNo);
    localStorage.setItem("price", selSeatsNo*ticketPrice);
}

function restoreSel(){
    const seatsSel=JSON.parse(localStorage.getItem("seatsSel"));
    const no=localStorage.getItem("no");
    const price=localStorage.getItem("price");
    count.innerText=no;
    total.innerText=price;
    if(seatsSel!==null && seatsSel.length>0){ //check if the selected seats are stored in localStorage
        seat.forEach((seats, index)=>{
            if(seatsSel.indexOf(index)>-1){  //if it isn't the current value, indexOf returns -1. here, if the index belongs to any of the selSeats values,- 
                seats.classList.add("sel");  //-the index of the seats stored in localStorage is given the class 'sel'
            }
        });
    }
}