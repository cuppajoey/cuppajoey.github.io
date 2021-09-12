// Initialize smoothscrolling plugin for all anchor targets
let scroll = new SmoothScroll('a[href*="#"]');

// 
// Handle contact form submissions
// 
let form = document.getElementById("cjContact");

async function handleSubmit(event) {
    event.preventDefault();

    let status = document.getElementById("formResponse");
    let data = new FormData(event.target);
    
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        status.innerHTML = "Thanks for reaching out, I'll get back to you as soon as I can!";
        form.reset()
    }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form. Do you mind trying again?"
    });
}
form.addEventListener("submit", handleSubmit);