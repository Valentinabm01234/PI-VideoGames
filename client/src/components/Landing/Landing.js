import { Link } from 'react-router-dom';
import './landing.css'

export default function Landing() {

  return (
    <div className="MyImage">
        <Link to="/videogames">
          <button className="myButton">INSERT COIN</button>
        </Link>
    </div>
  );
}