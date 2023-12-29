let oldIndex =1 
let currentIndex = 4
let loading = false;

const loadingTarget = document.getElementById('loading-target')

const fetchData = ()=>  new Promise( (resolve)=>{
    loading =true
    setTimeout(()=>{
        oldIndex =currentIndex
        currentIndex += 4
        loading=false
        resolve()
    },1000)
}
)

const appendItem =async ()=>{
    await fetchData()
    for(let i = oldIndex+1; i<= currentIndex; i++ ){
        let newItem = document.createElement("li")
        newItem.className="item"
        newItem.innerText=i
        document.querySelector("ul").insertBefore(newItem,loadingTarget)
    }
}

const observer = new IntersectionObserver((entities, observer)=>{
    const { isIntersecting } = entities[0];

    if(isIntersecting&&!loading){
        appendItem()
    }
})

observer.observe(loadingTarget)