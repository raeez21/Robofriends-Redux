import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import {connect} from 'react-redux'
import { setSearchfield, requestRobots } from '../actions';


const mapStateToProps = (state) =>{
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onSearchChange: (event)=>dispatch(setSearchfield(event.target.value)),
        onRequestRobots: ()=> dispatch(requestRobots())
    }
}
class App extends Component{
    componentDidMount(){
        
        this.props.onRequestRobots()
    }
    render(){
        const {searchField, onSearchChange, robots,isPending} = this.props
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return isPending ? //if robots lenght is 0
        <h1>Loading!!!</h1>: //return this as placeholder
        ( //else proceed normally
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = { filteredRobots }/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
        ) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
