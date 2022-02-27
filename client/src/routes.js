import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AUTH, CREATEPAGE, LINKS, DETAILPAGE } from "./utils/consts"
import { AuthPage } from './pages/auth'
import { CreatePage } from './pages/createPage'
import { LinksPage } from './pages/links'
import { DetailsPage } from './pages/detailPage'

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Routes>
                <Route path={CREATEPAGE} element={<CreatePage />}/>
                <Route path={LINKS} element={<LinksPage />}/>
                <Route path={DETAILPAGE} element={<DetailsPage />}/>
                <Route
                        path="*"
                        element={<Navigate to={CREATEPAGE} />}
                />
            </Routes>
        )
    }
    return (
            <Routes>
                <Route path={AUTH} element={<AuthPage />}/>
                <Route
                        path="*"
                        element={<Navigate to={AUTH} />}
                />
            </Routes>
        )
}