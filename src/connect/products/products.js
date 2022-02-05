import {connect} from "react-redux";
import { getProducts } from '../../store/products';
import { toggleSelectedState } from "../../store/products";
import { filterProducts } from "../../store/products";

const mapStateToProps = (state) => ({
    products: getProducts(state)
})

const mapDispatchToProps = (dispatch) => ({
    changeSelectedState(item) {
        return dispatch(toggleSelectedState(item));
    },
    filterState(text) {
        return dispatch(filterProducts(text));
    }
})

export const productsConnect = connect(mapStateToProps, mapDispatchToProps);