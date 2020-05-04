export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultParent: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list'),
    pageBtnParent: document.querySelector('.results__pages')
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {

    const loader = `
        <div class=${elementStrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader)
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    // check if this element is present in the DOM. If it is, remove it from the DOM
    if ( loader ) loader.parentElement.removeChild(loader) 
}