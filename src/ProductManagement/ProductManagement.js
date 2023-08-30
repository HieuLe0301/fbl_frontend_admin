import { useState,useEffect } from 'react'
import './ProductManagement.css'

const Category = ({categoryName, onClick, selectedCategoriesNames}) => {
    const [selected, setSelected] = useState(false)
    const [parent,setParents] = useState([])
    const [children,setChildren] = useState([])

    useEffect(()=>{console.log("selected categories changed!")},[selectedCategoriesNames])

    const handleToggleSelected = async(e) => {
        e.target.classList.toggle("is_clicked")
        setSelected(!selected)
        onClick(categoryName)
        try {
            const response = await fetch(
                'http://localhost:8000/fetchParentAndChildren',
                {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        categoryName: categoryName
                    })
                }
            )
            const result = await response.json()
            setParents(result['parent'])
            setChildren(result['children'])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div onClick={handleToggleSelected}>{categoryName}</div>
            {selected && (children.length !== 0) && (
                <div>
                    {children.map((child) => (
                        <Category
                            key={child}
                            categoryName={child}
                            onClick={onClick}
                            selectedCategoriesNames={selectedCategoriesNames}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}








const ProductManagement = () => {

    // VARIABLES
    const [categoriesNames,setCategoriesNames] = useState([])
    const [selectedCategoriesNames, setSelectedCategoriesNames] = useState([])

    // FUNCTIONS
    const fetchCategoriesNames = async() => {
        try {
            console.log("fetching categories names")
            const response = await fetch(
                "http://localhost:8000/fetchCategoriesNames",
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            const result = await response.json()
            const categories_names = result["categories_names"]
            setCategoriesNames(categories_names)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{fetchCategoriesNames()},[])
    useEffect(() => {console.log(categoriesNames)},[categoriesNames])
    useEffect(() => {console.log(selectedCategoriesNames)},[selectedCategoriesNames])

    // HANDLERS
    // HANDLE CATEGORY CLICK

    const handleCategoryClick = async (categoryName) => {
        if (!selectedCategoriesNames.includes(categoryName)){
            setSelectedCategoriesNames([...selectedCategoriesNames,categoryName])
        } else {
            setSelectedCategoriesNames(selectedCategoriesNames.filter((e) => e !== categoryName))
            /* 

                REMEMBER TO ALSO CLEAR OFF THE DESCENDANTS OF THE COLLASPED CATEGORY

            */
        }
    }

    return (
        <div>
            hi from product management
            {categoriesNames.map((categoryName) => (
                <Category 
                    key = {categoryName}
                    categoryName = {categoryName}
                    onClick = {handleCategoryClick}
                    selectedCategoriesNames={selectedCategoriesNames}
                />
            ))}
        </div> 
    )
}    

export default ProductManagement