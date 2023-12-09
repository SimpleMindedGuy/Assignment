import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../State/States';

export default function Settings() {

    const language = useSelector ((state)=>{
        return state.global.language
      })
      const dispatch = new useDispatch();

    return (
        <button onClick={()=>dispatch(changeLanguage())}>
            Change Langauge ({language})
        </button>
    )
}
