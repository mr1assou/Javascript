// select items
const productsContainer=document.querySelector('.products-container')
const companies=document.querySelector('.companies')
// let's start out Logic

const Btns=products.reduce((accumulator,product)=>{
    const button=product.company.charAt(0).toUpperCase()+product.company.slice(1)
    if(!accumulator.includes(button)){
        accumulator.push(button)
    }
    return accumulator
},['all'])
const buttons=Btns.map(button=>{
    return `<button class="company-btn">${button}</button>`
}).join('')
companies.innerHTML=buttons
// addEventListenner
const allButtons=document.querySelectorAll('.company-btn')
allButtons.forEach(button=>{
    button.addEventListener('click',e=>{
        const company=e.currentTarget.textContent
        if(company!=='all'){
            const filterCompanies=products.filter(product=>{
                if(product.company===company.toLowerCase()){
                    return product
                }
            })
            const mapCompanies=filterCompanies.map(company=>{
                return `<article class="product">
                    <img src=${company.image} class="product-img img"/>
                <footer>
                <h5 class="product-name">${company.title}</h5>
                <span class="product-price">${company.price}</span>
                </footer>
                </article>`
            }).join('')
            productsContainer.innerHTML=mapCompanies
        }
        if(company==='all'){
            const mapCompanies=products.map(company=>{
                return `<article class="product">
                    <img src=${company.image} class="product-img img"/>
                <footer>
                <h5 class="product-name">${company.title}</h5>
                <span class="product-price">${company.price}</span>
                </footer>
                </article>`
            }).join('')
            productsContainer.innerHTML=mapCompanies
        }
    })
})
// select form and search input
const form=document.querySelector('.input-form')
const searchInput=document.querySelector('.search-input')
// add EventListenner form
form.addEventListener('keyup',()=>{
    const inputValue=searchInput.value
    const filterSearch=products.filter(product=>{
        if(product.title.includes(inputValue.toLowerCase())){
            return product
        }
    })
    const mapSearch=filterSearch.map(product=>{
        return `<article class="product">
                    <img src=${product.image} class="product-img img"/>
                <footer>
                <h5 class="product-name">${product.title}</h5>
                <span class="product-price">${product.price}</span>
                </footer>
                </article>`
    }).join('')
    if(filterSearch.length!==0){
        productsContainer.innerHTML=mapSearch
    }
    else{
        productsContainer.textContent=`Sorry, no products matched your search`
    }
})
window.addEventListener('DOMContentLoaded',()=>{
    const mapCompanies=products.map(company=>{
                return `<article class="product">
                    <img src=${company.image} class="product-img img"/>
                <footer>
                <h5 class="product-name">${company.title}</h5>
                <span class="product-price">${company.price}</span>
                </footer>
                </article>`
            }).join('')
    productsContainer.innerHTML=mapCompanies
})







