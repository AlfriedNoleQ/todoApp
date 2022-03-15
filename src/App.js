import './App.css';
import './css/base.css';
import './css/style.css';

import "react-toastify/dist/ReactToastify.css";

import Header from './components/Header'
import TodoLists from './components/TodoLists'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer 
        autoClose={3000}
      />
      <section className='todoapp'>
        <Header />
        <TodoLists />
        <Footer />
      </section>
    </>
  );
}

export default App;
