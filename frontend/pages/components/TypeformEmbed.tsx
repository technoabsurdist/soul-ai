import React, { useEffect } from 'react';
import styles from './Login.module.css';

function TypeformEmbed() {
   useEffect(() => {
      const script = document.createElement('script');
      
      script.src = "//embed.typeform.com/next/embed.js";
      script.async = true;
      
      document.body.appendChild(script);
      
      return () => {
         document.body.removeChild(script);
      }
   }, []);

   return (
        <a
            data-tf-popup="EaIyXHDi"
            data-tf-opacity="100"
            data-tf-size="100"
            data-tf-iframe-props="title=Dreams Typeform"
            data-tf-transitive-search-params
            data-tf-medium="snippet"
            className={styles.waitlist}
        >
            Waitlist
        </a>
   );
}

export default TypeformEmbed;
