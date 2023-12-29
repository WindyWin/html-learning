const target = document.querySelector('#target')

const options = {
  rootMargin: '0px',
  threshold: 1,
};

function callback(entries, observer) {
  const { isIntersecting } = entries[0];
  console.clear()
  console.table(entries)
  console.log(`Is element 100% visible: ${isIntersecting}`)
}

const observer = new IntersectionObserver(callback, options);
observer.observe(target);