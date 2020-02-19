import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient;

        switch (this.props.type) {
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}/>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}/>
                        <div className={classes.Seeds2}/>
                    </div>
                );
                break;
            case ('paneer'):
                ingredient = <div className={classes.Paneer}/>;
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}/>;
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}/>;
                break;
            case ('patty'):
                ingredient = <div className={classes.Patty}/>;
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;