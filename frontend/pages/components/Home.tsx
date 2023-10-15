import React, { useState } from 'react';
import Archive from './Archive';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import styles from './Home.module.css';
import PromptNewInput from '../PromptNewInput';

const Home = () => {
    const [reloadTrigger, setReloadTrigger] = useState(false);

    const afterSubmit = () => {
        setReloadTrigger(!reloadTrigger);
    };

    return (
        <>
            <PromptNewInput afterSubmit={afterSubmit} />
            <Archive reload={reloadTrigger} />
        </>
    );
};

export default Home;
