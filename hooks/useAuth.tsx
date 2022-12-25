import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

export interface IAuthProviderProps {
  children: React.ReactNode
}

export interface IAuthContext {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  loading: false,
})

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [initialLoading, setInitalLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          setLoading(false)
        } else {
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitalLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredentials.user)
      router.push('/')
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      setUser(userCredentials.user)
      router.push('/')
      setLoading(false)
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setUser(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const memoizedValue = useMemo(
    () => ({ user, signUp, signIn, loading, logout }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
