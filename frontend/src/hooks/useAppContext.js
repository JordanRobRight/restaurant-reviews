import {AppContext} from '../context/appContext'
import { useContext } from 'react'

export const useAppContext = () =>{
    const context = useContext(AppContext)

    if(!context){
        throw Error('useAppContext must be used inside a AppContectProvider')
    }
    return context
}