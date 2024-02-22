import { NavLink } from 'react-router-dom'

function NotFound () {
    return (
        <section>
            <h2>Opps! That page doesn't exist and proably never will!</h2>
            <NavLink to="/"><button>Return Home</button></NavLink>
        </section>
    )
}


export default NotFound