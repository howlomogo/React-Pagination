import React, { Component } from 'react';

var Paginate = require('react-simple-paginate');
var _ = require('underscore');


/* Pagination Component 
-------------------------------------------------*/

const propTypes = {
    items: React.PropTypes.array.isRequired,
    onChangePage: React.PropTypes.func.isRequired,
    initialPage: React.PropTypes.number    
}

const defaultProps = {
    initialPage: 1
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pager: {},
            pageSize: 5
        };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var items = this.props.items;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, this.state.pageSize);

        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    changePageSize(event) {
        // Call setpage AFTER pagesize has been set I will set it to 1 here
        console.log(event.target.value);
        this.setState ({
            pageSize: event.target.value
        }, () => {
            this.setPage(1);
        })
    }

    // categoryFilterHandler(event) {
    //     console.log(event);
    //     this.setState({ categoriesFilter: event.target.value });
    // }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }


        const categoriesList =[
            2,
            5, 
            10
        ]
        .map(item => {
            return (
                <option key={item}>{item}</option>
            )
        })

        return (
            <div>
                <button type="button" onClick={() => {this.changePageSize(2)}}>Simulate change page</button>
                <select value={this.state.pageSize} onChange={this.changePageSize.bind(this)}>
                    {categoriesList}
                </select>


                <ul className="pagination">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </div>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;