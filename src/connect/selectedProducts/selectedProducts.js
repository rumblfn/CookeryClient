import {connect} from "react-redux";
import { getSelectedProducts, getSelectedProductsNames } from '../../store/products';
import { toggleSelectedState } from "../../store/products";

const mapStateToProps = (state) => ({
    products: getSelectedProducts(state),
    lstOfProductsNames: getSelectedProductsNames(state)
})

const mapDispatchToProps = (dispatch) => ({
    changeSelectedState(item) {
        return dispatch(toggleSelectedState(item));
    },
})

export const selectedProductsConnect = connect(mapStateToProps, mapDispatchToProps);