import { Component } from 'react'
import {Route, Switch} from "react-router-dom"

import Palette from './Palette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'


class App extends Component {
  constructor(props){
    super(props)
    const savedPalette = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {
      palettes:  savedPalette || seedColors 
    }
  }
  
  syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  findPalette = (id) => {
    return this.state.palettes.find((palette)=>{
      return palette.id === id
    })
  }
  
  savePalette = (newPalette) => {
    this.setState({palettes: [...this.state.palettes, newPalette]},
      this.syncLocalStorage
    )
  }

  deletePalette = (id) => {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  render(){
    return (
      <div>
        <Switch>
          <Route exact path='/palette/new' render={(routeProps) => (
            <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes}/>
          )}/>

          <Route exact path='/' render={(routeProps) => 
            <PaletteList 
              palettes={this.state.palettes} 
              {...routeProps} 
              deletePalette={this.deletePalette}
            />
          }/>

          <Route exact path='/palette/:id' render={(routeProps)=>
           <Palette palette={
              generatePalette(this.findPalette(routeProps.match.params.id))}
              />
            }
          />

          <Route exact path='/palette/:paletteId/:colorId' 
            render={(routeProps)=>   
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
              />
            }  
          />

          <Route render={(routeProps) => 
            <PaletteList 
              palettes={this.state.palettes} 
              {...routeProps} 
              deletePalette={this.deletePalette}
            />
          }/>
        </Switch>
      </div>
      )
  }
}

export default App
