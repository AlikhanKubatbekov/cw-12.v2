import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import { Typography } from '@mui/material';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Recipes from './features/recipes/Recipes';
import AuthorRecipes from './features/recipes/AuthorRecipes/AuthorRecipes';
import RecipesForm from './features/recipes/RecipesForm';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id" element={<AuthorRecipes />} />
        <Route path="/add-new-recipe" element={<RecipesForm />} />

        <Route path="*" element={<Typography variant="h2">Not found!</Typography>} />
      </Routes>
    </Layout>
  );
};

export default App;
