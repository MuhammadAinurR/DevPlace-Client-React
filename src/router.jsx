import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import RegisterPage from "./pages/RegisterPage";
import TagsPage from "./pages/TagsPage";
import PostForm from "./pages/PostForm";
import ComponentGenerator from "./pages/ComponentGenerator";
import CodeConverter from "./pages/CodeConverter";
import Guides from "./pages/Guides";
import EditForm from "./pages/EditForm";
import GithubTrending from "./pages/GithubTrending";
import CodeSolver from "./pages/CodeSolver";


const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        loader: () => {
            if (!localStorage.getItem('token')) return null;
            return redirect('/')
        }
    },
    {
        path: '/register',
        element: <RegisterPage />,
        loader: () => {
            if (!localStorage.getItem('token')) return null;
            return redirect('/')
        }
    },
    {
        path: '',
        element: <MainLayout />,
        loader: () => {
            if (localStorage.getItem('token')) return null;
            return redirect('/login')
        },
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'tags',
                element: <TagsPage />
            },
            {
                path: 'post',
                element: <PostForm />
            },
            {
                path: 'component-generator',
                element: <ComponentGenerator />
            },
            {
                path: 'code-converter',
                element: <CodeConverter />
            },
            {
                path: 'code-solver',
                element: <CodeSolver />
            },
            {
                path: 'guide',
                element: <Guides />
            },
            {
                path: 'posts/:id/edit',
                element: <EditForm />
            },
            {
                path: 'github-trending',
                element: <GithubTrending />
            }
        ]
    },
])

export default router;