import React from 'react';
import styles from './BottomHomePage.module.css';

const dummyData = [
  {
    title: "Dream 1",
    content: "This is a preview of the text that is under the title..."
  },
  {
    title: "Dream 2",
    content: "Another dream, and this is its preview..."
  },
  {
    title: "Dream 1",
    content: "This is a preview of the text that is under the title..."
  },
  {
    title: "Dream 2",
    content: "Another dream, and this is its preview..."
  },
  {
    title: "Dream 1",
    content: "This is a preview of the text that is under the title..."
  },
  {
    title: "Dream 2",
    content: "Another dream, and this is its preview..."
  },
];

const BottomHomePage = () => {
  return (
    <div className={styles.gridContainer}>
      {dummyData.map((note, index) => (
        <div key={index} className={styles.gridItem}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BottomHomePage;
