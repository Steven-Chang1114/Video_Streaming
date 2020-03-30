import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {fetchStreams} from "../../actions"
import StreamCreate from "./StreamCreate"

class StreamList extends React.Component{
    componentDidMount = () => {
        this.props.fetchStreams()
    }

    renderAdmin = (stream) => {
        if (stream.userId === this.props.currentUserId){
            return (
                <div className = "right floated content">
                    <button className = "ui button primary">
                        Edit
                    </button>
                    <button className = "ui button negative">
                        Delete
                    </button>
                </div>
            )
        }
    }

    renderCreate = () => {
        if(this.props.isSignedIn){
            return(
                <div style = {{textAlign: "right"}}>
                    <Link className = "ui button primary" to = "/streams/new">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        return this.props.streams.map(el => {
            return (
                <div className = "item" key = {el.id}>
                    {this.renderAdmin(el)}
                    <i className = "large middle aligned icon camera" />
                    <div className = "content">
                        {el.title}
                        <div className = "description">
                            {el.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    render(){
        return(
            <div>
                <h2>Streams</h2>
                <div className = "ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams), 
        currentUserId: state.user.userId,
        isSignedIn: state.user.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList)