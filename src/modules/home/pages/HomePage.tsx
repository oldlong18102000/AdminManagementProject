import { push, replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../configs/routes';
import '../../../scss/HomePage.scss';
import { ACCESS_TOKEN_KEY } from '../../../ultis/constants';
import ContactPage from './ContactPage';

interface Props { }

const HomePage = (props: Props) => {
  const dispatch = useDispatch()
  const onLogout = () => {
    Cookies.remove(ACCESS_TOKEN_KEY)
    dispatch(replace(ROUTES.login))
  }
  return <div>
    <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', overflow: 'hidden', margin: '0', padding: '0', backgroundColor: '#f1f1f1' }}>
      <li> WHICH Industries </li>
      <li> HOW we do it</li>
      <li> WHY work with us</li>
      <li> WHAT Services </li>
      <li> WITH technologies</li>
      <li onClick={() => dispatch(push(ROUTES.contact))}> WHO we are</li>
      <li style={{ float: 'right' }}><button onClick={onLogout}>Logout</button></li>
    </ul >
    <div style={{ backgroundColor: '#dbcece', textAlign: 'center' }}>
      <h2>A Global Software Product Studio <br /> Our Software Product Development Process</h2>
      <div className='Container'>
        <div className='item'>
          <h5><div>Build your product from scratch</div></h5>
          <div>From a simple concept in your mind, to a fully functional solution on your server and user’s desk</div>
        </div>
        <div className='item'>
          <h5><div>Extend your development team</div></h5>
          <div>Boost your development team and delivery speed with PowerGate’s dedicated software development experts</div>
        </div>
        <div className='item'>
          <h5><div>Manage an entire service</div></h5>
          <div>Remove your internal heavy cost with our product maintenance, QA, and DevOps teams</div>
        </div>
      </div >
    </div>
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: '#f47321', paddingTop: '10px' }}>Get to know Us</h2>
    </div>
    <div className='Container'>
      <div className='item'>
        <h5><div className='qodef-counter-holder'>150</div></h5>
        <div>Top Tech Specialists</div>
      </div>
      <div className='item'>
        <h5><div className='qodef-counter-holder'>5</div></h5>
        <div>Average Project Team</div>
      </div>
      <div className='item'>
        <h5><div className='qodef-counter-holder'>200</div></h5>
        <div>Successful Projects</div>
      </div>
      <div className='item'>
        <h5><div className='qodef-counter-holder'>180</div></h5>
        <div>Clients Served Globally</div>
      </div>
      <div className='item'>
        <h5><div className='qodef-counter-holder'>96</div></h5>
        <div>Satisfaction Rate</div>
      </div>
    </div >
    <div className='Container'>
      <div className='item'>
        <a href="https://powergatesoftware.com/wp-content/uploads/2020/06/new3.jpg">
          <img src="https://powergatesoftware.com/wp-content/uploads/2020/06/new3.jpg" height='200' width='350'></img>
        </a>
      </div>
      <div className='item'>
        <a href="https://powergatesoftware.com/wp-content/uploads/2020/06/IMG_4546.jpg">
          <img src="https://powergatesoftware.com/wp-content/uploads/2020/06/IMG_4546.jpg" height='200' width='350'></img>
        </a>
      </div>
      <div className='item'>
        <a href="https://powergatesoftware.com/wp-content/uploads/2020/06/IMG_5004-1.jpg">
          <img src="https://powergatesoftware.com/wp-content/uploads/2020/06/IMG_5004-1.jpg" height='200' width='350'></img>
        </a>
      </div>
    </div>
    {/* <ContactPage></ContactPage> */}
  </div>
};

export default HomePage;
