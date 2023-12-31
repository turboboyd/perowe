import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import useExercise from "../../hooks/useExercise";

import ExercisesSubcategoriesItem from '../ExercisesSubcategoriesItem/ExercisesSubcategoriesItem';
import css from './ExercisesItemType.module.css'
import { fetchExercisesFilter } from '../../redux/exercises/exercisesOperations';
import { EXERCISES_ROUTE } from '../../utils/const';


function ExercisesItemType({ type, page, limit , setLimit }) {
  const { exercisesFilter } = useExercise();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const ITEM_WIDTH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--item-width'));
  const ITEM_HEIGHT = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--item-height'));

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if ((windowWidth >= 1440) || (windowWidth < 768)) {
        setLimit(10);
      } else {
        setLimit(9);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, [setLimit]);

  useEffect(() => {
    dispatch(fetchExercisesFilter({ type, page, limit }))
  },[dispatch, type, page, limit])

  const handleSubcategoryClick = (id) => {
      navigate(`${EXERCISES_ROUTE}/${id}`);
  };

  return (
    <>
      <div className={css.exercisesContainer}>
        {exercisesFilter &&
          exercisesFilter
            .map((exercise) => (
              <div key={exercise._id} className={css.exerciseItem}>
                <ExercisesSubcategoriesItem
                  exercise={exercise}
                  style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                  onClick={() => handleSubcategoryClick(exercise._id)}
                />
              </div>
            ))}
      </div>
    </>
  );
};

export default ExercisesItemType