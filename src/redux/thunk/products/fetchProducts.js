import { loadProduct } from "../../actions/productAction";

export const loadProductData = () => {
    return async(dispatch, getState) => {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
            
        if (data.length) {
            dispatch(loadProduct(data))
        }
     };
}