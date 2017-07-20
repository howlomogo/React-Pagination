import Pagination from './Pagination';

var React = require('react');
var ReactDOM = require('react-dom');
var Paginate = require('react-simple-paginate');
var _ = require('underscore');


/* App Component 
-------------------------------------------------*/

class App extends React.Component {
    constructor() {
        super();

        // an example array of items to be paged
        // var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });

        var products = [
            {
                id: 1,
                name: "Carrot",
                stocked: true,
                cat: "groceries",
                price: 0.79
            },
            {
                id: 2,
                name: "Coke",
                stocked: true,
                cat: "drinks",
                price: 1.29
            },
            {
                id: 3,
                name: "Lamb",
                stocked: false,
                cat: "meat",
                price: 4.59
            },
            {
                id: 4,
                name: "Shredded Wheat",
                stocked: false,
                cat: "cereal",
                price: 2.49
            },
            {
                id: 5,
                name: "Beef",
                stocked: true,
                cat: "meat",
                price: 3.89
            },
            {
                id: 6,
                name: "Cheese",
                stocked: true,
                cat: "groceries",
                price: 0.79
            },
            {
                id: 7,
                name: "Monkey",
                stocked: true,
                cat: "drinks",
                price: 1.29
            },
            {
                id: 8,
                name: "Donkey",
                stocked: false,
                cat: "meat",
                price: 4.59
            },
            {
                id: 9,
                name: "Grapes",
                stocked: false,
                cat: "cereal",
                price: 2.49
            },
            {
                id: 10,
                name: "Fish",
                stocked: true,
                cat: "meat",
                price: 3.89
            },
            {
                id: 11,
                name: "Bananna",
                stocked: true,
                cat: "groceries",
                price: 0.79
            },
            {
                id: 12,
                name: "Apple",
                stocked: true,
                cat: "drinks",
                price: 1.29
            },
            {
                id: 13,
                name: "Lemonade",
                stocked: false,
                cat: "meat",
                price: 4.59
            },
            {
                id: 14,
                name: "Chereos",
                stocked: false,
                cat: "cereal",
                price: 2.49
            },
            {
                id: 15,
                name: "Salad",
                stocked: true,
                cat: "meat",
                price: 3.89
            }
        ]

        console.log(products);



        this.state = {
            products: products,
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>React - Pagination Example with logic like Google</h1>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}

                        <Pagination items={this.state.products} onChangePage={this.onChangePage} />
                    </div>
                </div>
                <hr />
                <div className="credits text-center">
                    <p>
                        <a href="http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google" target="_top">React - Pagination Example with Logic like Google</a>
                    </p>
                    <p>
                        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </div>
        );
    }
}

/* Render Call
-------------------------------------------------*/
ReactDOM.render(<App />, document.getElementById('app'));