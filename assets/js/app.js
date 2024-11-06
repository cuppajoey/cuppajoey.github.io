// Initialize smoothscrolling plugin for all anchor targets
let scroll = new SmoothScroll('a[href*="#"]');

/** @param {MouseEvent} event */
function toggleAccordion(event) {
  if (this.hasAttribute('data-open')) {
    this.removeAttribute('data-open');
    return;
  }

  // collapse all other accordions in the group
  collapseAccordionGroup(event.target.closest('.accordion-group'));

  // open clicked accordion
  this.setAttribute('data-open', true);
}

/** @param {HTMLDivElement} group - Node with class `accordion-group` */
function collapseAccordionGroup(group) {
  if (!group.classList.contains('accordion-group')) return null;

  // collapse all open accordions
  group.querySelectorAll('.accordion[data-open]').forEach(accordion => accordion.removeAttribute('data-open'));
}

const accordions = document.querySelectorAll('.accordion');
if (accordions.length) {
  accordions.forEach(accordion => {
    accordion.addEventListener('click', toggleAccordion);
  })
}

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
if (form) {
  form.addEventListener("submit", handleSubmit);
}
