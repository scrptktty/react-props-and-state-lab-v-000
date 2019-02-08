import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all',
      },
    }
  }

  handleChangeFilterType = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event,
      },
    })
  }

  // reminder: arrow functions will implicitly bind `this` inside of them!!
  findPets = () => {
    let petUrl = '/api/pets'

    if (this.state.filters.type !== 'all') {
      petUrl = petUrl + `?type=${this.state.filters.type}`
    }

    fetch(petUrl)
    .then(resp => resp.json())
    .then(petList => console.log(petList))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                filters={this.state.filters}
                onChangeType={this.handleChangeFilterType}
                onFindPetsClick={this.findPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
