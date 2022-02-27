import React, { useCallback, useState, useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';


export const DetailsPage = () => {
    const auth = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getlink = useCallback(async () => {
        try{
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, 
                {Authorization: `Bearer ${auth.token}`}
            )
            setLink(fetched)
        } catch (e) {
            
        }
    }, [auth.token, linkId, request])

    useEffect(() => {
        getlink()
    }, [getlink])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}