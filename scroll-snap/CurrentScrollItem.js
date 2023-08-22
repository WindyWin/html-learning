let container = document.querySelector('.container')
let containerBounds = null
let currentItem = 0
let itemIndex = 0
let scrollButtons = document.querySelectorAll('.scroll-button')

// Store items as an array of objects
const items = Array.from(document.querySelectorAll('.child')).map(el => ({ el }))

const storeBounds = () => {
    // Store the bounds of the container
    containerBounds = container.getBoundingClientRect() // triggers reflow
    // Store the bounds of each item
    items.forEach((item, i) => {
        item.bounds = item.el.getBoundingClientRect() // triggers reflow
        item.offsetY = item.bounds.top - containerBounds.top // store item offset distance from container
    })
}
storeBounds() // Store bounds on load

const detectCurrent = () => {
    const scrollY = container.scrollTop // Container scroll position
    const goal = containerBounds.height / 2 // Where we want the current item to be, 0 = top of the container
    prevItem = currentItem
    const oldItemIndex = itemIndex
    itemIndex = 0
    // Find item closest to the goal
    currentItem = items.reduce((prev, curr) => {
        const check = (Math.abs(curr.offsetY - scrollY - goal) < Math.abs(prev.offsetY - scrollY - goal))

        if (check) itemIndex++

        return check ? curr : prev;// return the closest to the goal
    })

    // Do stuff with currentItem
    // here
    if (oldItemIndex !== itemIndex) {
        scrollButtons[oldItemIndex].classList.remove('active')
        scrollButtons[itemIndex].classList.add('active')
    }


}
detectCurrent() // Detect the current item on load

container.addEventListener('scroll', () => detectCurrent()) // Detect current item on scroll
container.addEventListener('resize', () => storeBounds()) // Update bounds on resize in case they have changed