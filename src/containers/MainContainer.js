import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
const stockUrl = 'http://localhost:3000/stocks'

class MainContainer extends Component {
  constructor() {
    super()

    this.state = {
      stocks: [],
      portfolio: [],
      sortBy: 'None',
      filterBy: 'All',
    }
  }

  componentDidMount() {
    fetch(stockUrl)
    .then( r => r.json())
    .then(stockData => this.setState({ stocks: stockData }))
  }

  addToPortfolio =(buyStock)=> {
    let changedPortfolio = this.state.portfolio.slice()
    if (!changedPortfolio.includes(buyStock.id)) {
      changedPortfolio.push(buyStock.id)
      this.setState({ portfolio: changedPortfolio })
    }
  }

  removeFromPortfolio =(sellStock)=> {
    let changedPortfolio = this.state.portfolio.filter( id => {
      if (id !== sellStock.id)
        return true
    })
    this.setState({ portfolio: changedPortfolio })
  }

  filterAndSortStocks =()=> {
    let stocks = this.state.stocks.slice()
    if (this.state.sortBy === 'Alphabetically')
      stocks = stocks.sort((a,b) => {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if (nameA > nameB)
          return 1
        else if (nameA < nameB)
          return -1
        else
          return 0
      })
    if (this.state.sortBy === 'Price')
      stocks = stocks.sort((a,b) => {
        let key = "price"
        return b[key] - a[key];
      })

    if (this.state.filterBy !== 'All')
      stocks = stocks.filter( stock => stock.type.toLowerCase().includes(this.state.filterBy.toLowerCase()) )

    return stocks
  }

  changeFilter =(e)=> this.setState({ filterBy: e.target.value })
  changeSort =(e)=> this.setState({ sortBy: e.target.value })

  render() {
    console.log(this.state.stocks)
    return (
      <div>
        <SearchBar
          sortBy={this.state.sortBy}
          filterBy={this.state.filterBy}
          changeFilter={this.changeFilter}
          changeSort={this.changeSort}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.filterAndSortStocks()}
                addStock={this.addToPortfolio}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                stocks={this.filterAndSortStocks()}
                myStocks={this.state.portfolio}
                removeStock={this.removeFromPortfolio}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
