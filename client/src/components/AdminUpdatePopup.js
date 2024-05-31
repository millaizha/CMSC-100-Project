import { useEffect } from "react";

/**
 * COMPONENT: Popup
 * PURPOSE: Displays a temporary popup notification with an image and title.
 *
 * PROPS:
 *  - show (boolean): Controls the visibility of the popup.
 *  - onClose (Function): Callback function to close the popup.
 *  - image (string): URL of the image to be displayed in the popup.
 *  - title (string): Text to be displayed as the title of the popup.
 *
 * STATE: None
 *
 * USAGE:
 *  - Used to provide visual feedback to the user after adding an item to the cart.
 */

export default function Popup({ show, onClose, image, title }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-0 right-0 m-12 p-4 w-[400px] bg-green-600 text-white rounded-xl transition-transform transform z-50 ${
        show ? "translate-y-0" : "translate-y-64"
      }`}
      style={{ transitionDuration: "0.5s" }}
    >
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt="Product"
          className="w-24 h-24 object-cover rounded-xl"
        />
        <div className="flex flex-col w-2/3">
          <h1 className="font-bold">Updated stock!</h1>
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {" "}
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}
