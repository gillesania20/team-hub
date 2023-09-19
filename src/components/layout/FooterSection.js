import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
const FooterSection = () => {
    return (
        <footer className='bg-body-tertiary text-center py-5 px-2'>
            <div className='mb-3'>
                <span>Created by Lorenz Gillesania &copy; 2023</span>
            </div>
            <div>
                <Link to='https://github.com/gillesania20' className='text-dark'>
                    <FontAwesomeIcon icon={faGithub} className='social-media-icons' />
                </Link>
            </div>
        </footer>
    );
}
export default FooterSection;