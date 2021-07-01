//import axios from "axios";
const stripe = Stripe('pk_test_51J5UwGJyQ6fuwVkqjB01deVGXo32y8wxEY7udzYv2Ud0elvTjhdRjFpy5a8ldi4rDs0IVPJej4ggeNJ04hnQpd9J009T9blDYe');
const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  };
  
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 5000);
};
  


const bookTour = async tourId => {
   try {
    // 1) get checkout session from api
    const booking = await fetch(`http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`)
    const session = await booking.json();
    console.log(session)
    // // 2) create checkout from + change credit card
        await stripe.redirectToCheckout({
            sessionId: session.session.id
        });
    
    } catch(err) {
        console.log(err);
        showAlert('error', err)
    }
};

const bookBtn = document.getElementById('book-tour');

if (bookBtn)
bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...'
    const { tourId } = e.target.dataset;
    bookTour(tourId);
})