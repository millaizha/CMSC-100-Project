import { useEffect } from 'react';

export default function Popup({ show, onClose, image, title }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return <div className={`fixed bottom-0 right-0 m-12 p-4 w-[400px] bg-green-600 text-white rounded-xl transition-transform transform ${
    show ? 'translate-y-0' : 'translate-y-64'
  }`} style={{ transitionDuration: '0.5s'}}>
    <div className='flex items-center gap-4'>
        <img src={image} alt="Product" className='w-24 h-24 object-cover rounded-xl' />
        <div className='flex flex-col w-2/3'>
           <h1 className='font-bold'>Added to cart!</h1>
            <span className='text-ellipsis whitespace-nowrap overflow-hidden'> {title}</span>
        </div>

    </div>
  
  </div>;
}
