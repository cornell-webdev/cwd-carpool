import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import { IRootState } from 'src/types/redux.type'

const Home = React.lazy(() => import('src/pages/home/Home'))
const AuthCallback = React.lazy(() => import('src/pages/auth-callback/AuthCallback'))
const Login = React.lazy(() => import('src/pages/login/Login'))
const Logout = React.lazy(() => import('src/pages/logout/Logout'))
const TermsAndConditions = React.lazy(
  () => import('src/pages/terms-and-conditions/TermsAndConditions')
)
const PrivacyPolicy = React.lazy(() => import('src/pages/privacy-policy/PrivacyPolicy'))

interface IRoute {
  path: string
  component: React.FC
  label?: string
  isPublicNav: boolean
  isPrivateNav: boolean
  isPrivateRoute: boolean
  isDesktopOnly: boolean
}

export const routes: IRoute[] = [
  // auth
  {
    path: '/logout',
    component: Logout,
    label: 'Sign out',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/login',
    component: Login,
    label: 'Sign in',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/auth/callback',
    component: AuthCallback,
    label: '',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicy,
    label: 'Privacy policy',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/terms-and-conditions',
    component: TermsAndConditions,
    label: 'Terms and Conditions',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
  {
    path: '/',
    component: Home,
    label: 'Home',
    isPublicNav: false,
    isPrivateNav: false,
    isPrivateRoute: false,
    isDesktopOnly: false,
  },
]

const PrivateRoute = ({ component: Component, ...rest }: IRoute) => {
  const { accessToken } = useSelector((state: IRootState) => state.authState)
  const router = useRouter()

  if (!accessToken || accessToken.length === 0) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { prevPath: router.location.pathname + router.location.search },
        }}
      />
    )
  }

  return <Route {...rest} render={() => <Component />} />
}

const DesktopRoute = ({ component: Component, ...rest }: IRoute) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Redirect to='/mobile-block' />
  }

  return <Route {...rest} render={() => <Component />} />
}

const Routes = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        {routes.map(({ path, component, isPrivateRoute, isDesktopOnly, ...rest }) =>
          isPrivateRoute ? (
            <PrivateRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
            />
          ) : isDesktopOnly ? (
            <DesktopRoute
              key={path}
              path={path}
              component={component}
              isPrivateRoute={isPrivateRoute}
              isDesktopOnly={isDesktopOnly}
              {...rest}
            />
          ) : (
            <Route key={path} path={path} component={component} />
          )
        )}
      </Switch>
    </Suspense>
  )
}

export default Routes
