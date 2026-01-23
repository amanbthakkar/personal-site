import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../data/routes';

const Menu = lazy(() => import('react-burger-menu/lib/menus/slide'));

const Hamburger = () => {
  const [open, setOpen] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <div className='hamburger-container'>
      <nav className='main' id='hamburger-nav' aria-label='Mobile navigation'>
        <ul>
          <li className={`menu ${open ? 'close-menu' : 'open-menu'}`}>
            <button
              type="button"
              onClick={toggleMenu}
              onKeyDown={handleKeyDown}
              className='menu-hover'
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="hamburger-menu"
            >
              {open ? '✕' : '☰'}
            </button>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<></>}>
        <Menu right isOpen={open} id="hamburger-menu" aria-hidden={!open}>
          <ul className='hamburger-ul'>
            {routes.map((l) => (
              <li key={l.label}>
                <Link 
                  to={l.path} 
                  onClick={() => setOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setOpen(false);
                    }
                  }}
                >
                  <h3 className={l.index && 'index-li'}>{l.label}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Menu>
      </Suspense>
    </div>
  );
};

export default Hamburger;
